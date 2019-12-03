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
import { ParameterService } from './_services/parameter.service';
import { CustomAttributeService } from './_services/custom-attribute.service';

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
    ParameterService,
    CustomAttributeService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
