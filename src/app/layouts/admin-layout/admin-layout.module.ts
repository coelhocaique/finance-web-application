import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { DebtsComponent } from '../../debts/debts.component';
import { DebtsNewComponent } from '../../debts/create/debts-new.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSelectModule } from '@angular/material/select'
import { CurrencyMaskModule } from "ng2-currency-mask";
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule, MatNativeDateModule} from "@angular/material";
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDatepickerModule} from '@angular/material/datepicker';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatCheckboxModule, 
  MatSortModule
} from '@angular/material';
import { IncomeComponent } from 'app/income/income.component';
import { IncomeNewComponent } from 'app/income/create/income-new.component';
import { LoginComponent } from 'app/login/login.component';
import { RegisterComponent } from 'app/register/register.component';
import { LogoutComponent } from '../../logout/logout.component';
import { AuthGuard } from 'app/_guards';
import { DebtTagComponent } from 'app/settings/debt-tag/debt-tag.component';
import { DebtTypeComponent } from 'app/settings/debt-type/debt-type.component';
import { DebtThresholdComponent } from 'app/settings/debt-threshold/debt-threshold.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    CurrencyMaskModule,
    MatTableModule, 
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    IconsComponent,
    NotificationsComponent,
    DebtsComponent,
    DebtsNewComponent,
    DialogComponent,
    IncomeComponent,
    IncomeNewComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    DebtTagComponent,
    DebtTypeComponent,
    DebtThresholdComponent
  ],
  providers: [AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [DialogComponent]
})

export class AdminLayoutModule {}
