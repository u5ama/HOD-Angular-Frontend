import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../core/store/_services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-rating-chart',
  templateUrl: './rating-chart.component.html',
  styleUrls: ['./rating-chart.component.css']
})
export class RatingChartComponent implements OnInit {
  width = 600;
  height = 400;
  type = 'line';
  dataFormat = 'json';
  // tslint:disable-next-line:ban-types
  dataSource: Object;
  ratingData: any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getRatingStats();
  }
  getRatingStats(){
    this.userService.getDashRatingStats().subscribe(res => {
      this.ratingData = res.myData.records[0].graph_data;
      this.rateDate(this.ratingData);
    });
  }
  rateDate(nData){
    if (nData){
      let i;
      for (i = 0; i < nData.length; i++){
        nData[i].label = moment(nData[i].activity_date).format('MMM YY');
        nData[i].value = nData[i].count;
        delete nData[i].activity_date;
        delete nData[i].count;
      }
      const data = {
        chart: {
          caption: '',
          subCaption: '',
          xAxisName: '',
          yAxisName: '',
          theme: 'fusion'
        },
        data: nData
      };
      this.dataSource = data;
    }else{
      const chartData = [];
      const data = {
        chart: {
          caption: '',
          subCaption: '',
          xAxisName: '',
          yAxisName: '',
          theme: 'fusion'
        },
        data: chartData
      };
      this.dataSource = data;
    }
  }
}
