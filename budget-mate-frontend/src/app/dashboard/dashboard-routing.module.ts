import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BudgetDashboardComponent} from "./budget-dashboard/budget-dashboard.component";
import {ProfileComponent} from "./profile/profile.component";
import {UsersComponent} from "./users/users/users.component";
import {RolesComponent} from "./users/roles/roles.component";
import {PricingComponent} from "./pricing/pricing.component";
import {SavingsDashboardComponent} from "./savings-dashboard/savings-dashboard.component";
import {BillingDetailsComponent} from "./billing-details/billing-details.component";
import {InvoiceComponent} from "./invoice/invoice.component";
import {FrequentyAskedQuestionsComponent} from "./frequenty-asked-questions/frequenty-asked-questions.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'budget',
        component: BudgetDashboardComponent,
      },
      {
        path: 'pricing',
        component: PricingComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'roles',
        component: RolesComponent
      },
      {
        path: 'piggy',
        component: SavingsDashboardComponent,
      },
      {
        path: 'billings',
        component: BillingDetailsComponent,
      },
      {
        path: 'invoice/:code',
        component: InvoiceComponent,
      },
      {
        path:'faq',
        component:FrequentyAskedQuestionsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
