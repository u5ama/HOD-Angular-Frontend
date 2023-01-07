import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {CustomerFormsComponent} from './customer-forms.component';
import { PaymentFormSettingComponent } from './payment-form-setting/payment-form-setting.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [PaymentFormSettingComponent],
  exports: [
    PaymentFormSettingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomerFormsComponent
      },
    ]),
    MatFormFieldModule,
    ReactiveFormsModule,
  ]
})
export class CustomerFormsModule { }
