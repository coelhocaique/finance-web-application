import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { DebtsComponent } from '../../debts/debts.component';
import { DebtsNewComponent } from '../../debts/create/debts-new.component';
import { DialogComponent } from 'app/dialog/dialog.component';
import { IncomeComponent } from '../../income/income.component';
import { IncomeNewComponent } from '../../income/create/income-new.component';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register.component';
import { AuthGuard } from '../../_guards';

export const AdminLayoutRoutes: Routes = [
    { path: '',               component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent},
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'icons',          component: IconsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'debts'  ,        component: DebtsComponent, canActivate: [AuthGuard]},
    { path: 'debt'  ,         component: DebtsNewComponent, canActivate: [AuthGuard]},
    { path: 'dialog'  ,       component: DialogComponent, canActivate: [AuthGuard]},
    { path: 'incomes'  ,      component: IncomeComponent, canActivate: [AuthGuard]},
    { path: 'income'  ,       component: IncomeNewComponent, canActivate: [AuthGuard]},
];
