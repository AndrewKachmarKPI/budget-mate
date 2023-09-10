import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BudgetDashboardComponent} from "./budget-dashboard/budget-dashboard.component";
import {ProfileComponent} from "./profile/profile.component";
import {UsersComponent} from "./users/users/users.component";
import {PricingComponent} from "./pricing/pricing.component";
import {SavingsDashboardComponent} from "./savings-dashboard/savings-dashboard.component";
import {BillingDetailsComponent} from "./billing-details/billing-details.component";
import {InvoiceComponent} from "./invoice/invoice.component";
import {FrequentyAskedQuestionsComponent} from "./frequenty-asked-questions/frequenty-asked-questions.component";
import {UserRoles} from "../auth/models/user-roles";
import {BudgetViewComponent} from "./budget-view/budget-view.component";
import {AuthGuard} from "../auth/tools/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'budgets',
        component: BudgetDashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'pricing',
        component: PricingComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [UserRoles.ADMIN]
        }
      },
      {
        path: 'piggy',
        component: SavingsDashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'billings',
        component: BillingDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'bill/:code',
        component: InvoiceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'faq',
        component: FrequentyAskedQuestionsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'budget/:id',
        component: BudgetViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
