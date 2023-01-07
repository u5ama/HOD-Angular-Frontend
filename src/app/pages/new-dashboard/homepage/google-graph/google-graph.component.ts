import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../core/store/_services/user.service';
import * as moment from 'moment';
@Component({
  selector: 'app-google-graph',
  templateUrl: './google-graph.component.html',
  styleUrls: ['./google-graph.component.css']
})
export class GoogleGraphComponent implements OnInit {
  spendData = [];
  costData = [];
  labelData = [];
  // tslint:disable-next-line:ban-types
  dataSource: Object;
  width = 600;
  height = 400;
  type = 'msspline';
  dataFormat = 'json';

  constructor(private userService: UserService) {
    this.userService.getDashAdsSpendStats().subscribe(res => {
      this.spendData = res.myData.records[0].graph_data;
      if (this.spendData) {
        let i;
        for (i = 0; i < this.spendData.length; i++) {
          // this.spendData[i].label = moment(this.spendData[i].activity_date).format('MMM');
          this.spendData[i].value = this.spendData[i].count;
          // this.spendData[i].color = '#FFDC77';
          delete this.spendData[i].activity_date;
          delete this.spendData[i].count;
        }
      }

      // tslint:disable-next-line:no-shadowed-variable
      this.userService.getDashCostLeadStats().subscribe(res => {
        this.costData = res.myData.records[0].graph_data;
        if (this.costData) {
          let j;
          for (j = 0; j < this.costData.length; j++) {
            //  this.costData[j].label = moment(this.costData[j].activity_date).format('MMM');
            this.costData[j].value = this.costData[j].count;
            // this.spendData[i].color = '#FFDC77';
            delete this.costData[j].activity_date;
            delete this.costData[j].count;
          }
        }
        // tslint:disable-next-line:no-shadowed-variable
        this.userService.getDashCostLeadStats().subscribe(res => {
          this.labelData = res.myData.records[0].graph_data;
          if (this.labelData) {
            let m;
            for (m = 0; m < this.labelData.length; m++) {
              this.labelData[m].label = moment(this.labelData[m].activity_date).format('MMM');
              // this.labelData[j].value = this.labelData[j].count;
              // this.spendData[i].color = '#FFDC77';
              delete this.labelData[m].activity_date;
              delete this.labelData[m].count;
            }
          }
          const spendChart = this.spendData;
          const costChart = this.costData;
          const labelChart = this.labelData;

          const dataSource = {
            chart: {
              caption: '',
              yaxisname: '',
              subcaption: '',
              adjustDiv: '0',
              numdivlines: '9',
              showvalues: '0',
              legenditemfontsize: '15',
              legenditemfontbold: '1',
              legendPosition: 'top',
              plottooltext: '',
              yAxisValuesPadding: '10',
              theme: 'fusion'
            },
            categories: [
              {
                category: labelChart
              }
            ],
            dataset: [
              {
                seriesname: 'Lead Converted',
                data: spendChart
              },
              {
                seriesname: 'Total Cost',
                style: {
                  plot: {
                    'stroke-dasharray': '5 2',
                  }
                },
                data: costChart
              }
            ]
          };
         // console.log(dataSource);
          this.dataSource = dataSource;
        });
      });
    });
  }

  ngOnInit(): void {
  }

}
