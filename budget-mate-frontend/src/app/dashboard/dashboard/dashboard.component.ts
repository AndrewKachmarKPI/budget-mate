import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../_services/auth.service";
import {bounceAnimation} from "angular-animations";
import {NgxSpinnerService} from "ngx-spinner";
import {UserDto} from "../../auth/models/user-dto";
import {UserService} from "../services/user.service";
import {BillingPlan} from "../../auth/models/billing-plan";

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
  public userDto: UserDto;

  constructor(private router: Router, private spinnerService: NgxSpinnerService, private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getProfile();
    this.listenAvatarChange();
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
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  public shake() {
    this.animationState = !this.animationState;
  }

  public openMyBalanceDialog() {
    this.shake();
    setTimeout(() => {
      this.spinnerService.show('main');
    }, 500);
    setTimeout(() => {
      this.spinnerService.hide('main');
    }, 5000);
  }

  public getProfile() {
    this.userService.myProfile().subscribe({
      next: (userDto) => {
        this.userDto = userDto;
      }
    })
  }

  public listenAvatarChange() {
    this.userService.currentAvatar.subscribe({
      next: (url) => {
        if (url) this.userDto.avatarId = url;
      }
    })
  }

  public getBillingPlanColor() {
    if (this.userDto.billingPlan == BillingPlan.BASIC) return "bg-label-warning";
    if (this.userDto.billingPlan == BillingPlan.PREMIUM) return "bg-label-primary";
    if (this.userDto.billingPlan == BillingPlan.PRO) return "bg-label-info";
    return "";
  }

  public isAdmin() {
    return this.authService.isAdmin;
  }
}
