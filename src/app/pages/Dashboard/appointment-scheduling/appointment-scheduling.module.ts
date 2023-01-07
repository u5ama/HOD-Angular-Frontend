import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppointmentSchedulingComponent} from './appointment-scheduling.component';
import { FormSettingsComponent } from './form-settings/form-settings.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormFieldsComponent } from './form-fields/form-fields.component';
import { LocationComponent } from './form-fields/location/location.component';
import { CategoryComponent } from './form-fields/category/category.component';
import { ServiceComponent } from './form-fields/service/service.component';
import { AppointmentDateComponent } from './form-fields/appointment-date/appointment-date.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ServicePayementsComponent} from './form-fields/service-payements/service-payements.component';

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [FormSettingsComponent, FormFieldsComponent, LocationComponent, CategoryComponent, ServiceComponent, AppointmentDateComponent, ServicePayementsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AppointmentSchedulingComponent
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ]
})
export class AppointmentSchedulingModule { }
