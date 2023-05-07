import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {url} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${url}/auth/signin`,
      {
        username,
        password,
      }
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${url}/auth/signup`,
      {
        username,
        email,
        password,
      }
    );
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
