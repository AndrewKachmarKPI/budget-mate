import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../_services/auth.service";
import {bounceAnimation, fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, shakeAnimation} from "angular-animations";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    bounceAnimation(),
  ]
})
export class DashboardComponent implements OnInit {
  public menuItems: Map<string, any> = new Map<string, any>();
  public nestedElements: HTMLLIElement[] = [];
  public animationState: boolean = false;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  get currentYear() {
    return new Date().getFullYear();
  }

  public isRouteActive(route): boolean {
    return this.router.url.includes(route);
  }

  public openDropdownMenu(route: string, element: HTMLLIElement) {
    if (!this.menuItems.has(route)) {
      this.menuItems.set(route, {
        state: false,
        element: element
      });
    }

    if (!this.menuItems.get(route).state) {
      this.closeAllRoutes();
      element.classList.add('open');
      element.classList.remove('menu-item-closing');
      this.menuItems.set(route, {
        state: true,
        element: element
      });
    } else {
      element.classList.remove('open');
      element.classList.add('menu-item-closing');
      this.menuItems.set(route, {
        state: false,
        element: element
      });
    }
  }

  public closeAllRoutes() {
    this.menuItems.forEach((state, route) => {
      const element = state.element;
      element.classList.remove('open');
      element.classList.add('menu-item-closing');
    })
  }

  public openNestedMenu(element: HTMLLIElement) {
    this.nestedElements.forEach(element => {
      element.classList.remove('active');
    });
    element.classList.add('active');
    this.nestedElements.push(element);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  public shake() {
    this.animationState = !this.animationState;
  }

  public openMyBalanceDialog() {
    this.shake();
  }
}
