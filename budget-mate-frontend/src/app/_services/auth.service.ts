import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {login_url, url} from "../../environments/environment";
import {RegisterUserDto} from "../auth/models/register-user-dto";
import {UserDto} from "../auth/models/user-dto";

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
  constructor(private http: HttpClient) {
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
    return this.http.post(`${url}/auth/signout`, {});
  }

  public isLoggedIn() {
    return true;
  }

  public getUserRoles() {
    return [];
  }
}
