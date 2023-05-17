import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../_services/auth.service";
import {TokenService} from "../_services/token-service";

@Injectable({providedIn: 'root'})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService,
              private tokenService: TokenService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (error.error.error === 'invalid_token') {
          } else {
            this.router.navigate(['/auth/login']);
          }
        }
        return throwError(() => error);
      }));
  }
}
