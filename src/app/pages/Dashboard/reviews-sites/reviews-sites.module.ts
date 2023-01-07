import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReviewsSitesComponent} from './reviews-sites.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AngularGooglePlaceModule} from 'angular-google-place';
import {WidgetLoaderComponent} from './widget-loader/widget-loader.component';

@NgModule({
  declarations: [ReviewsSitesComponent, WidgetLoaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReviewsSitesComponent
      }
    ]),
    ReactiveFormsModule,
    MatFormFieldModule,
    AngularGooglePlaceModule
  ]
})
export class ReviewsSitesModule { }
