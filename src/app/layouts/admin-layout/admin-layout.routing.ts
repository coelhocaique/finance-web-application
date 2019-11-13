import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { DebtsComponent } from '../../debts/debts.component';
import { DebtsNewComponent } from '../../debts-new/debts-new.component';
import { DialogComponent } from 'app/dialog/dialog.component';
import { IncomeComponent } from '../../income/income.component';
import { IncomeNewComponent } from '../../income-new/income-new.component';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register.component';
import { AuthGuard } from '../../_guards';
export const AdminLayoutRoutes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'debts'  ,        component: DebtsComponent, canActivate: [AuthGuard]},
    { path: 'debts-new'  ,    component: DebtsNewComponent, canActivate: [AuthGuard]},
    { path: 'dialog'  ,       component: DialogComponent, canActivate: [AuthGuard]},
    { path: 'incomes'  ,      component: IncomeComponent, canActivate: [AuthGuard]},
    { path: 'income-new'  ,   component: IncomeNewComponent, canActivate: [AuthGuard]},
];
