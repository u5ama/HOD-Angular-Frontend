import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../core/store/_services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-review-chart',
  templateUrl: './review-chart.component.html',
  styleUrls: ['./review-chart.component.css']
})
export class ReviewChartComponent implements OnInit {
  statData = '';
  // tslint:disable-next-line:ban-types
  dataSource: Object;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getReviewStats();
  }
  getReviewStats(){
    this.userService.getDashReviewStats().subscribe(res => {
      this.statData = res.myData.records[0].graph_data;
      this.nFunction();
    });
  }
  nFunction(){
    this.chartData(this.statData);
  }
  chartData(nData){
    if (nData){
      let i;
      for (i = 0; i < nData.length; i++){
        nData[i].label = moment(nData[i].activity_date).format('MMM YY');
        nData[i].value = nData[i].count;
        delete nData[i].activity_date;
        delete nData[i].count;
      }
      const chartData = nData;
      const dataSource = {
        chart: {
          caption: '',
          subCaption: '',
          xAxisName: '',
          yAxisName: '',
          theme: 'fusion'
        },
        data: chartData
      };
      this.dataSource = dataSource;
    }else{
      const chartData = [];
      const dataSource = {
        chart: {
          caption: '',
          subCaption: '',
          xAxisName: '',
          yAxisName: '',
          theme: 'fusion'
        },
        data: chartData
      };
      this.dataSource = dataSource;
    }
  }
}
