import { Component, OnInit } from '@angular/core';
import {ChartLegendOptions, ChartOptions, ChartType} from 'chart.js';
import {MultiDataSet, Label} from 'ng2-charts';

@Component({
  selector: 'app-website-traffic-source-doughnut',
  templateUrl: './website-traffic-source-doughnut.component.html',
  styleUrls: ['./website-traffic-source-doughnut.component.css']
})
export class WebsiteTrafficSourceDoughnutComponent implements OnInit {
  public LegendsOptions: ChartLegendOptions = {
    fullWidth: true,
  };
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { position: 'bottom' },
  };
  doughnutChartLabels: Label[] = ['Organic', 'Referral', 'Direct', 'Social', 'Others', 'Email', 'Display', 'Paid Search'];
  doughnutChartData: MultiDataSet = [
    [10, 11, 7, 9, 10, 7, 4, 19]
  ];
  doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors = [
    {
      backgroundColor: [
        '#5D62B5',
        '#29C3BE',
        '#F2726F',
        '#FFC533',
        '#62B58F',
        '#BC95DF',
        '#67CDF2',
        '#5D62B5',

      ],
    }
  ];
  // public pieChartPlugins = [{
  //   afterLayout(chart) {
  //     chart.legend.legendItems.forEach(
  //       (label) => {
  //         const value = chart.data.datasets[0].data[label.index];
  //
  //         label.text += ' ' + value + '%';
  //         return label;
  //       }
  //     );
  //   }
  // }];
  constructor() { }

  ngOnInit(): void {
  }

}
