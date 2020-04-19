import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';  
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DebtsService } from './_services/debts.service';
import { IncomeService } from './_services/income.service';
import { DashboardService } from './_services/dashboard.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { JwtInterceptor, ContentTypeInterceptor } from './_helpers';
import { DebtTagService } from './_services/debt-tag.service';
import { DebtTypeService } from './_services/debt-type.service';
import { DebtThresholdService } from './_services/debt-threshold.service';
import { RecurringDebtService } from './_services/recurring-debt.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  providers: [
    DebtsService,
    IncomeService,
    DashboardService,
    AuthenticationService,
    UserService,
    DebtTagService,
    DebtTypeService,
    DebtThresholdService,
    RecurringDebtService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
