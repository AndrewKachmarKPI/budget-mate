import {Component, OnInit} from '@angular/core';
import {UserDto} from "../../auth/models/user-dto";
import {UserService} from "../services/user.service";
import {BillingPlan} from "../../auth/models/billing-plan";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  public userDto: UserDto;

  constructor(private userService: UserService) {
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
}
