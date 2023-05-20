import {Component, OnInit} from '@angular/core';
import {UserDto} from "../../auth/models/user-dto";
import {UserService} from "../services/user.service";
import {BillingPlan} from "../../auth/models/billing-plan";
import {UserRoles} from "../../auth/models/user-roles";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  public userDto: UserDto;

  constructor(private userService: UserService, private auth: AuthService, private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getProfile();
  }

  public getProfile() {
    this.userService.myProfile().subscribe({
      next: (userDto) => {
        this.userDto = userDto;
      }
    })
  }

  get billings(): typeof BillingPlan {
    return BillingPlan;
  }

  get roles(): typeof UserRoles {
    return UserRoles;
  }

  public promote(userRole: UserRoles) {
    this.userService.promoteUser(userRole.toString().replace("ROLE_", "")).subscribe({
      next: (user) => {
        this.refreshUser(user);
      }
    })
  }

  public refreshUser(user) {
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']).then(value => {
          this.toast.success("Billing plan changed to " + user.billingPlan)
        });
      }
    });
  }
}
