import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserDto} from "../../../auth/models/user-dto";
import {BillingPlan} from "../../../auth/models/billing-plan";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: UserDto[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      }
    })
  }

  public getBillingPlanColor(userDto:UserDto) {
    if (userDto.billingPlan == BillingPlan.BASIC) return "bg-label-warning";
    if (userDto.billingPlan == BillingPlan.PREMIUM) return "bg-label-primary";
    if (userDto.billingPlan == BillingPlan.PRO) return "bg-label-info";
    return "";
  }
}
