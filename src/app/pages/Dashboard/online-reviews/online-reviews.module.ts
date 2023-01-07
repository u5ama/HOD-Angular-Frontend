import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineReviewsComponent } from './online-reviews.component';
import {RouterModule} from '@angular/router';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [OnlineReviewsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OnlineReviewsComponent
      },
    ]),
    DataTablesModule,
    FormsModule,
  ]
})
export class OnlineReviewsModule { }
