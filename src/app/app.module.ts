import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgetPasswordComponent } from './pages/auth/forget-password/forget-password.component';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './core/store/_heplers/jwt.interceptor';
import {ErrorInterceptor} from './core/store/_heplers/error.interceptor';
import {AngularGooglePlaceModule} from 'angular-google-place';
import {AuthModule} from './pages/auth/auth.module';
import { HomeComponent } from './pages/Dashboard/home/home.component';
import {DashboardComponent} from './pages/Dashboard/dashboard.component';
import { UserManagementComponent } from './pages/Dashboard/user-management/user-management.component';
import { AppointmentSchedulingComponent } from './pages/Dashboard/appointment-scheduling/appointment-scheduling.component';
import { ReviewRequestComponent } from './pages/Dashboard/review-request/review-request.component';
import { BillingsComponent } from './pages/Dashboard/billings/billings.component';
import { ErrorsPageComponent } from './pages/errors-page/errors-page.component';
import { ApploaderComponent } from './pages/apploader/apploader.component';
import {DataTablesModule} from 'angular-datatables';
import {LoaderService} from './core/store/_services/loader.service';
import {LoaderInterceptor} from './core/store/_heplers/loader.interceptor';
import { RequestloaderComponent } from './pages/requestloader/requestloader.component';
import {FacebookRedirectComponent} from './pages/Dashboard/reviews-sites/facebook-redirect/facebook-redirect.component';
import {FusionChartsModule} from 'angular-fusioncharts';
import { ChartsModule } from 'ng2-charts';
// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as Widgets from 'fusioncharts/fusioncharts.widgets';
import * as charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import {ReviewChartComponent} from './pages/Dashboard/home/review-chart/review-chart.component';
import {RatingChartComponent} from './pages/Dashboard/home/rating-chart/rating-chart.component';
import {LeadsChartComponent} from './pages/Dashboard/home/leads-chart/leads-chart.component';
import {GoogleRedirectComponent} from './pages/Dashboard/home/google-redirect/google-redirect.component';
import { NavbarComponent } from './pages/Dashboard/layouts/navbar/navbar.component';
import { CustomerFormsComponent } from './pages/Dashboard/customer-forms/customer-forms.component';
import {HomeModule} from './pages/Dashboard/home/home.module';
import {SchedulerModule} from '@progress/kendo-angular-scheduler';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import { NavbarHeaderComponent } from './pages/Dashboard/layouts/navbar-header/navbar-header.component';
import {HighchartsChartModule} from 'highcharts-angular';
import { NewDashboardComponent } from './pages/new-dashboard/new-dashboard.component';
import { HomepageComponent } from './pages/new-dashboard/homepage/homepage.component';
// import { ChartsModule } from '@progress/kendo-angular-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HomepageModule} from './pages/new-dashboard/homepage/homepage.module';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbdProgressbarHeight } from './progressbar-height';

import 'hammerjs';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme, Widgets);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    HomeComponent,
    DashboardComponent,
    UserManagementComponent,
    AppointmentSchedulingComponent,
    ReviewRequestComponent,
    BillingsComponent,
    ErrorsPageComponent,
    ApploaderComponent,
    RequestloaderComponent,
    FacebookRedirectComponent,
    ReviewChartComponent,
    RatingChartComponent,
    LeadsChartComponent,
    GoogleRedirectComponent,
    NavbarComponent,
    CustomerFormsComponent,
    NavbarHeaderComponent,
    NewDashboardComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    AngularGooglePlaceModule,
    AuthModule,
    DataTablesModule,
    FormsModule,
    FusionChartsModule,
    HomeModule,
    SchedulerModule,
    HighchartsChartModule,
    ChartsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    HomepageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor , multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
