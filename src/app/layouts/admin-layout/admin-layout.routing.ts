import { Routes } from '@angular/router';

import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { DebtsComponent } from 'app/debts/debts.component';
import { IncomeComponent } from 'app/income/income.component';
import { LoginComponent } from 'app/login/login.component';
import { RegisterComponent } from 'app/register/register.component';
import { AuthGuard } from 'app/_guards';
import { LogoutComponent } from 'app/logout/logout.component';
import { DebtThresholdComponent } from 'app/settings/debt-threshold/debt-threshold.component';
import { DebtTypeComponent } from 'app/settings/debt-type/debt-type.component';
import { DebtTagComponent } from 'app/settings/debt-tag/debt-tag.component';
import { RecurringDebtComponent } from 'app/settings/recurring-debt/recurring-debt.component';

export const AdminLayoutRoutes: Routes = [
    { path: '',               component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent},
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
    // { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'debts'  ,        component: DebtsComponent, canActivate: [AuthGuard]},
    { path: 'incomes'  ,      component: IncomeComponent, canActivate: [AuthGuard]},
    { path: 'logout'  ,       component: LogoutComponent, canActivate: [AuthGuard]},
    { path: 'debt-threshold', component: DebtThresholdComponent, canActivate: [AuthGuard]},
    { path: 'debt-type'  ,    component: DebtTypeComponent, canActivate: [AuthGuard]},
    { path: 'debt-tag'  ,     component: DebtTagComponent, canActivate: [AuthGuard]},
    { path: 'recurring-debt'  ,     component: RecurringDebtComponent, canActivate: [AuthGuard]}
];
