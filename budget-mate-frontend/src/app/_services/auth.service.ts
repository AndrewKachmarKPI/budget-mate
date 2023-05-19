import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {login_url, url} from "../../environments/environment";
import {RegisterUserDto} from "../auth/models/register-user-dto";
import {UserDto} from "../auth/models/user-dto";
import {TokenService} from "./token-service";
import * as jwt_decode from 'jwt-decode';
import jwtDecode from "jwt-decode";
import {UserRoles} from "../auth/models/user-roles";

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + btoa('budgetMateAuth:budgetMate')
  })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,
              private tokenService: TokenService) {
  }

  login(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');
    return this.http.post<any>(`${login_url}/oauth/token`, body, HTTP_OPTIONS);
  }

  register(registerDto: RegisterUserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${url}/users/register`, registerDto);
  }

  logout(): Observable<any> {
    return this.http.delete(`${url}/users/logout`).pipe(
      tap(() => {
        this.tokenService.removeToken();
      })
    );
  }

  public isLoggedIn() {
    return true;
  }

  public getUserRoles() {
    let token = jwtDecode(this.tokenService.getToken());
    return token['authorities'];
  }

  get isAdmin() {
    let token = jwtDecode(this.tokenService.getToken());
    return token['authorities'].includes(UserRoles.ADMIN);
  }
}
