import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../core/store/_services/user.service';
import {environment} from '../../../../environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

class Person {
  first_name: string;
  last_name: string;
  type: string;
  smart_routing: string;
  site: string;
  phone_number: string;
  date_sent: string;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-review-request',
  templateUrl: './review-request.component.html',
  styleUrls: ['./review-request.component.css']
})
export class ReviewRequestComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  reviews: Person[];
  baseURL = `${environment.apiUrl}`;
  public accessToken: any;
  customerMailId = '';
  selectOption = '1';
  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    const that = this;
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    this.dtOptions = {
      pagingType: 'simple',
      serverSide: true,
      processing: false,
      ordering: true,
      order: [0, 'desc'],
      searching: false,
      responsive: true,
      lengthChange: false,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            this.baseURL + 'requests-sent?token=' + that.accessToken,
            dataTablesParameters, {}
          ).subscribe(resp => {
          // @ts-ignore
          that.reviews = resp.data.records;
          callback({
            draw: 1,
            // @ts-ignore
            recordsTotal: resp.data.records.length,
            // @ts-ignore
            recordsFiltered: resp.data.records.length,
            // @ts-ignore
            data: []
          });
        });
      },
      columns: [{ data: 'first_name' }, { data: 'last_name' }, { data: 'type' }, { data: 'email' }, { data: 'smart_routing' }, { data: 'site' }, { data: 'phone_number' }]
    };
  }

  emailBox(sample){
    this.customerMailId = sample;
  }
  sendEmail(){
    this.userService.sendInstantMail(this.customerMailId, this.selectOption).subscribe(res => {
      this.emailSuccess();
    });
  }
  emailSuccess()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Review Request Sent Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
        window.location.reload();
      }
    });
  }
}
