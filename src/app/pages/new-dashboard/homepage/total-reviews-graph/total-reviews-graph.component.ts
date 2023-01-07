import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../core/store/_services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-total-reviews-graph',
  templateUrl: './total-reviews-graph.component.html',
  styleUrls: ['./total-reviews-graph.component.css']
})
export class TotalReviewsGraphComponent implements OnInit {
  statData = [];
  // tslint:disable-next-line:ban-types
  dataSource: Object;
  width = 600;
  height = 400;
  type = 'column2d';
  dataFormat = 'json';

  constructor(private userService: UserService) {
    this.userService.getDashReviewStats().subscribe(res => {
      this.statData = res.myData.records[0].graph_data;

      if (this.statData){
        let i;
        for (i = 0; i < this.statData.length; i++){
          this.statData[i].label = moment(this.statData[i].activity_date).format('MMM');
          this.statData[i].value = this.statData[i].count;
          this.statData[i].color = '#FFDC77';
          delete this.statData[i].activity_date;
          delete this.statData[i].count;
        }
        const chartData = this.statData;
        const dataSource = {
          chart: {
            caption: '',
            subCaption: '',
            xAxisName: '',
            yAxisName: '',
            showYAxisValues: '0',
            chartLeftMargin: '0',
            chartRightMargin: '0',
            chartTopMargin: '0',
            chartBottomMargin: '0',
            labelFontSize: '8',
            rotateLabels: '0',
            labelDisplay: 'wrap',
            bgColor: '#ffffff',
            drawAnchors: '0',
            numDivLines: '0',
            divLineAlpha: '0',
            plotSpacePercent: '40',
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
            bgColor: '#ffffff',
            drawAnchors: '0',
            numDivLines: '0',
            divLineAlpha: '0',
            plotSpacePercent: '40',
            theme: 'fusion'
          },
          data: chartData
        };
        this.dataSource = dataSource;
      }
    });
  }

  ngOnInit(): void {
  }
}
