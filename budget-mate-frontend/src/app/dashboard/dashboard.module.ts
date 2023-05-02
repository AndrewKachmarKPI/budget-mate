import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { BudgetDashboardComponent } from './budget-dashboard/budget-dashboard.component';
import {ProfileComponent} from "./profile/profile.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';
import { ConnectionsSettingsComponent } from './connections-settings/connections-settings.component';



@NgModule({
  declarations: [DashboardComponent, BudgetDashboardComponent, ProfileComponent, AccountSettingsComponent, NotificationSettingsComponent, ConnectionsSettingsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {
}
