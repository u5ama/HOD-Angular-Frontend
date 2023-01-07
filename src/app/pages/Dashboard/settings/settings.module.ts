import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import {RouterModule} from '@angular/router';
import { EmailComponent } from './email/email.component';
import { SmsComponent } from './sms/sms.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [SettingsComponent, EmailComponent, SmsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingsComponent
      },
      {
        path: 'email_settings',
        component: EmailComponent
      },
      {
        path: 'sms_settings',
        component: SmsComponent
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SettingsModule { }
