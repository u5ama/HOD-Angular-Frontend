import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../core/store/_services/user.service';

@Component({
  selector: 'app-funnel-graph',
  templateUrl: './funnel-graph.component.html',
  styleUrls: ['./funnel-graph.component.css']
})
export class FunnelGraphComponent implements OnInit {
  title: string;
  dataSource: any;
  type: string;
  width: string;
  height: string;
  chart: any;
  events: any;
  revenue = '1';
  walkIn = '1';
  customers = '1';

  constructor(private userService: UserService) {
    this.type = 'funnel';
    this.width = '100%';
    this.height = '100%';
    this.userService.getCRMOverview().subscribe(res => {
      // console.log(res);
      if (res.funnel.records !== ''){
        this.revenue = res.funnel.records.revenue;
        this.walkIn = res.funnel.records.walkIn;
        this.customers = res.funnel.records.customer;

        const funnelData = [{
          label: 'ENQUIRIES',
          value: '1',
          color: '#84D7FF'
        }, {
          label: 'WALK-INS',
          value: this.walkIn,
          color: '#6CD6B3'
        }, {
          label: 'CUSTOMERS',
          value: this.customers,
          color: '#F68784'
        }, {
          label: 'REVENUE',
          value: this.revenue,
          color: '#FDD565'
        }];
        this.dataSource = {
          chart: {
            caption: '',
            subcaption: '',
            decimals: '1',
            isHollow: '1',
            labelDistance: '15',
            chartLeftMargin: '0',
            chartRightMargin: '0',
            chartTopMargin: '0',
            chartBottomMargin: '0',
            is2D: '1',
            plotTooltext: '$label : $value',
            showPercentValues: '1',
            streamlineddata: '0',
            theme: 'fusion'
          },
          data: funnelData
        };
      }
    });
  }

  ngOnInit(): void {
    this.getFunnelData();
  }

  /************* Overview *************/
  getFunnelData(){

  }
}
