import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { BudgetDashboardComponent } from './budget-dashboard/budget-dashboard.component';
import {ProfileComponent} from "./profile/profile.component";



@NgModule({
  declarations: [DashboardComponent, BudgetDashboardComponent, ProfileComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {
}
