import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule} from '@angular/router';
import {FusionChartsModule} from 'angular-fusioncharts';
// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { GoogleRedirectComponent } from './google-redirect/google-redirect.component';
import { CtmComponent } from './ctm/ctm.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { WidgetLoaderComponent } from './widget-loader/widget-loader.component';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
@NgModule({
  declarations: [CtmComponent, WidgetLoaderComponent],
  imports: [
    CommonModule,
    FusionChartsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      },
    ]),
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [
    CtmComponent,
    WidgetLoaderComponent
  ]
})
export class HomeModule { }
