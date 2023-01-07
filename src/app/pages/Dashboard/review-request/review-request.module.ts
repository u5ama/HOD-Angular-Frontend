import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReviewRequestComponent} from './review-request.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReviewRequestComponent
      },
    ]),
  ]
})
export class ReviewRequestModule { }
