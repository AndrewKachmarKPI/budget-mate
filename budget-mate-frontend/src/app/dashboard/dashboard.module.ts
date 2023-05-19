import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BudgetDashboardComponent} from './budget-dashboard/budget-dashboard.component';
import {ProfileComponent} from "./profile/profile.component";
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {NotificationSettingsComponent} from './notification-settings/notification-settings.component';
import {ConnectionsSettingsComponent} from './connections-settings/connections-settings.component';
import {UsersComponent} from './users/users/users.component';
import {RolesComponent} from './users/roles/roles.component';
import {PricingComponent} from './pricing/pricing.component';
import {SavingsDashboardComponent} from './savings-dashboard/savings-dashboard.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {ReactiveFormsModule} from "@angular/forms";
import {BillingDetailsComponent} from './billing-details/billing-details.component';
import {InvoiceComponent} from './invoice/invoice.component';
import {ImageCropperModule} from "ngx-image-cropper";
import {FrequentyAskedQuestionsComponent} from './frequenty-asked-questions/frequenty-asked-questions.component';
import {HttpClientModule} from "@angular/common/http";
import { ImgBoxComponent } from './img-box/img-box.component';


@NgModule({
  declarations: [
    DashboardComponent,
    BudgetDashboardComponent,
    ProfileComponent,
    AccountSettingsComponent,
    NotificationSettingsComponent,
    ConnectionsSettingsComponent,
    UsersComponent,
    RolesComponent,
    PricingComponent,
    SavingsDashboardComponent,
    BillingDetailsComponent,
    InvoiceComponent,
    FrequentyAskedQuestionsComponent,
    ImgBoxComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DashboardRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    ImageCropperModule
  ]
})

export class DashboardModule {
}
