import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {UserManagementComponent} from './user-management.component';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserManagementComponent
      },
    ]),
    DataTablesModule,
    FormsModule,
  ]
})
export class UserManagementModule { }
