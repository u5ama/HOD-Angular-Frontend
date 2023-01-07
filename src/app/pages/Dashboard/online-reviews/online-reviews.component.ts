import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../core/store/_services/user.service';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {environment} from '../../../../environments/environment';
class Person {
  rating: number;
  message: string;
  review_date: string;
  type: string;
  review_url: string;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-online-reviews',
  templateUrl: './online-reviews.component.html',
  styleUrls: ['./online-reviews.component.css']
})
export class OnlineReviewsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  reviews: Person[];
  searchTable: '';
  sourceVal: '';
  timeVal: '';
  ratingVal: '';
  @Input() max = 110;
  baseURL = `${environment.apiUrl}`;
  public accessToken: any;

  seeMore = false;
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
            this.baseURL + 'all-reviews?token=' + that.accessToken,
            dataTablesParameters, {}
          ).subscribe(resp => {
          if (resp){
            // @ts-ignore
            that.reviews = resp.myData.records.data;
            // @ts-ignore
            callback({
              // @ts-ignore
              draw: resp.myData.records.draw,
              // @ts-ignore
              recordsTotal: resp.myData.records.recordsTotal,
              // @ts-ignore
              recordsFiltered: resp.myData.records.recordsFiltered,
              // @ts-ignore
              data: resp.myData
            });
          }
        });
      },
      columns: [{ data: 'rating' }, { data: 'message' }, { data: 'review_date' }, { data: 'type' }, { data: 'review_url' }]
    };
  }

  onSearch(){
    this.sourceVal = '';
    this.timeVal = '';
    this.ratingVal = '';
    this.userService.searchReview(this.searchTable, this.sourceVal, this.timeVal, this.ratingVal).subscribe(res => {
      this.reviews = res.myData.records[0];
    });
  }

  sources(source){
    this.searchTable = '';
    this.timeVal = '';
    this.ratingVal = '';
    this.sourceVal = source.target.defaultValue;
    this.userService.searchReview(this.searchTable, this.sourceVal, this.timeVal, this.ratingVal).subscribe(res => {
      this.reviews = res.myData.records[0];
    });
  }
  timeFilter(time){
    this.searchTable = '';
    this.sourceVal = '';
    this.ratingVal = '';
    this.timeVal = time;
    this.userService.searchReview(this.searchTable, this.sourceVal, this.timeVal, this.ratingVal).subscribe(res => {
      this.reviews = res.myData.records[0];
    });
  }
  ratingFilter(rating){
    this.searchTable = '';
    this.sourceVal = '';
    this.timeVal = '';
    this.ratingVal = rating.target.defaultValue;
    this.userService.searchReview(this.searchTable, this.sourceVal, this.timeVal, this.ratingVal).subscribe(res => {
      this.reviews = res.myData.records[0];
    });
  }
}
