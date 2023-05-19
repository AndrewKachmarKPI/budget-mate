import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../_services/auth.service";
import {TokenService} from "../_services/token-service";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(protected router: Router, protected authService: AuthService,
              protected tokenService: TokenService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let hasRole = false;
    if (this.authService.isLoggedIn()) {
      let userRoles = this.authService.getUserRoles();
      console.log(userRoles);
      if (route.data['roles'] != undefined) {
        for (let userRole of userRoles) {
          if (route.data['roles'].indexOf(userRole) != -1) {
            return true;
          }
        }
      } else {
        hasRole = true;
      }
    }
    if (!hasRole) {
      this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
    }
    return hasRole;
  }
}
