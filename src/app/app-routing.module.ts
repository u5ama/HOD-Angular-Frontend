import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/store/_heplers/auth.guard';
import {DashboardComponent} from './pages/Dashboard/dashboard.component';
import {ErrorsPageComponent} from './pages/errors-page/errors-page.component';
import {FacebookRedirectComponent} from './pages/Dashboard/reviews-sites/facebook-redirect/facebook-redirect.component';
import {GoogleRedirectComponent} from './pages/Dashboard/home/google-redirect/google-redirect.component';
import {RedirectPageComponent} from './pages/auth/login/redirect-page/redirect-page.component';
import {NavbarComponent} from './pages/Dashboard/layouts/navbar/navbar.component';
import {FormSettingsComponent} from './pages/Dashboard/appointment-scheduling/form-settings/form-settings.component';
import {FormFieldsComponent} from './pages/Dashboard/appointment-scheduling/form-fields/form-fields.component';
import {NavbarHeaderComponent} from './pages/Dashboard/layouts/navbar-header/navbar-header.component';
import {CategoryComponent} from './pages/Dashboard/appointment-scheduling/form-fields/category/category.component';
import {ServiceComponent} from './pages/Dashboard/appointment-scheduling/form-fields/service/service.component';
import {AppointmentDateComponent} from './pages/Dashboard/appointment-scheduling/form-fields/appointment-date/appointment-date.component';
import {LocationComponent} from './pages/Dashboard/appointment-scheduling/form-fields/location/location.component';
// tslint:disable-next-line:max-line-length
import {ServicePayementsComponent} from './pages/Dashboard/appointment-scheduling/form-fields/service-payements/service-payements.component';
import {NewDashboardComponent} from './pages/new-dashboard/new-dashboard.component';


const routes: Routes = [
  {path: 'auth', loadChildren: () => import('src/app/pages/auth/auth.module').then(m => m.AuthModule)},
  {
    path: '',
    component: NewDashboardComponent,
    canActivate: [AuthGuard],
    children: [
        {
          path: 'dashboard',
          loadChildren: () => import('src/app/pages/new-dashboard/homepage/homepage.module').then(m => m.HomepageModule),
        },
         {
            path: 'online_reviews',
            loadChildren: () => import('src/app/pages/Dashboard/online-reviews/online-reviews.module').then(m => m.OnlineReviewsModule),
          },
          {
            path: 'requests_sent',
            loadChildren: () => import('src/app/pages/Dashboard/review-request/review-request.module').then(m => m.ReviewRequestModule),
          },
          {
            path: 'settings',
            loadChildren: () => import('src/app/pages/Dashboard/settings/settings.module').then(m => m.SettingsModule),
          },
          {
            path: 'appointments',
            // tslint:disable-next-line:max-line-length
            loadChildren: () => import('src/app/pages/Dashboard/appointment-scheduling/appointment-scheduling.module').then(m => m.AppointmentSchedulingModule),
          },
          {
            path: 'customers',
            loadChildren: () => import('src/app/pages/Dashboard/user-management/user-management.module').then(m => m.UserManagementModule),
          },
          {
            path: 'billing',
            loadChildren: () => import('src/app/pages/Dashboard/billings/billings.module').then(m => m.BillingsModule),
          },
          {
            path: 'connections',
            loadChildren: () => import('src/app/pages/Dashboard/reviews-sites/reviews-sites.module').then(m => m.ReviewsSitesModule),
          },
          {
            path: 'form_builder',
            loadChildren: () => import('src/app/pages/Dashboard/customer-forms/customer-forms.module').then(m => m.CustomerFormsModule),
          },
          {
            path: 'facebook_redirect',
            component: FacebookRedirectComponent,
          },
          {
            path: 'form_styling',
            component: FormSettingsComponent,
          },
          {
            path: 'appointment_settings',
            component: FormFieldsComponent,
            children: [
              {
                path: 'locations',
                component: LocationComponent,
              },
              {
                path: 'categories',
                component: CategoryComponent,
              },
              {
                path: 'services',
                component: ServiceComponent,
              },
              {
                path: 'appointment-date',
                component: AppointmentDateComponent,
              },
              {
                path: 'payment-script',
                component: ServicePayementsComponent,
              },
            ]
          },
          {
            path: 'google_redirect',
            component: GoogleRedirectComponent,
          },
         {
            path: 'error/403',
            component: ErrorsPageComponent,
            data: {
              type: 'error-v6',
              code: 403,
              title: '403... Access forbidden',
              desc: 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator',
            },
          },
          /*  {path: 'error/:type', component: ErrorsPageComponent},*/
         {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        // {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
        ],
      },
    {path: 'redirect', component: RedirectPageComponent},
    /* New Dashboard*/
    {
      path: '',
      component: DashboardComponent,
     // canActivate: [AuthGuard],
      children: [
        {
          path: 'old_dashboard',
          // loadChildren: () => import('src/app/pages/Dashboard/home/home.module').then(m => m.HomeModule),
          loadChildren: () => import('src/app/pages/Dashboard/home/home.module').then(m => m.HomeModule),
        },
      ]
    },
    {path: '', redirectTo: 'error/403', pathMatch: 'full'},
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
