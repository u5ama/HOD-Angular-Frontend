import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {HomepageComponent} from './homepage.component';
import {ChartModule} from '@progress/kendo-angular-charts';
import { CostPerLeadsGraphComponent } from './cost-per-leads-graph/cost-per-leads-graph.component';
import { LeadsGraphComponent } from './leads-graph/leads-graph.component';
import {FusionChartsModule} from 'angular-fusioncharts';
import { GoogleGraphComponent } from './google-graph/google-graph.component';
import { FbProgressBarsComponent } from './fb-progress-bars/fb-progress-bars.component';
import { FbGraphComponent } from './fb-graph/fb-graph.component';
import { WebsiteTrafficSourceGraphComponent } from './website-traffic-source-graph/website-traffic-source-graph.component';
import { TotalReviewsGraphComponent } from './total-reviews-graph/total-reviews-graph.component';
import { AdSpendGraphComponent } from './ad-spend-graph/ad-spend-graph.component';
import { TotalLeadsGraphComponent } from './total-leads-graph/total-leads-graph.component';
import { FunnelGraphComponent } from './funnel-graph/funnel-graph.component';
import { RevenueGraphComponent } from './revenue-graph/revenue-graph.component';
import {ChartsModule} from 'ng2-charts';
import { WebsiteTrafficSourceDoughnutComponent } from './website-traffic-source-doughnut/website-traffic-source-doughnut.component';
import { AppointmentCalenderComponent } from './appointment-calender/appointment-calender.component';
import {CalendarCommonModule, CalendarMonthModule} from 'angular-calendar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [CostPerLeadsGraphComponent, LeadsGraphComponent, GoogleGraphComponent, FbProgressBarsComponent, FbGraphComponent, WebsiteTrafficSourceGraphComponent, TotalReviewsGraphComponent, AdSpendGraphComponent, TotalLeadsGraphComponent, FunnelGraphComponent, RevenueGraphComponent, WebsiteTrafficSourceDoughnutComponent, AppointmentCalenderComponent],
  exports: [
    CostPerLeadsGraphComponent,
    CostPerLeadsGraphComponent,
    CostPerLeadsGraphComponent,
    LeadsGraphComponent,
    GoogleGraphComponent,
    WebsiteTrafficSourceGraphComponent,
    FbProgressBarsComponent,
    FbGraphComponent,
    TotalReviewsGraphComponent,
    AdSpendGraphComponent,
    TotalLeadsGraphComponent,
    TotalLeadsGraphComponent,
    FunnelGraphComponent,
    RevenueGraphComponent,
    WebsiteTrafficSourceDoughnutComponent,
    AppointmentCalenderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomepageComponent
      },
    ]),
    ChartModule,
    FusionChartsModule,
    ChartsModule,
    CalendarMonthModule,
    CalendarCommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ]
})
export class HomepageModule { }
