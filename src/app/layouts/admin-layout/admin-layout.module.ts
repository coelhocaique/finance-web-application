import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
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
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSelectModule } from '@angular/material/select'
import { CurrencyMaskModule } from "ng2-currency-mask";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule, MatNativeDateModule} from "@angular/material";
import { DialogComponent } from '../../dialog/dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

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
import { IncomeNewComponent } from 'app/income-new/income-new.component';
import { LoginComponent } from 'app/login/login.component';
import { RegisterComponent } from 'app/register/register.component';
import { AuthGuard } from 'app/_guards';

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
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    DebtsComponent,
    DebtsNewComponent,
    DialogComponent,
    IncomeComponent,
    IncomeNewComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AdminLayoutModule {}
