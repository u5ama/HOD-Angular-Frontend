import { Component, OnInit } from '@angular/core';
const data = {
  chart: {
    caption: '',
    subcaption: '',
    yaxisname: '',
    syaxisname: '',
    labeldisplay: '',
    snumbersuffix: '%',
    scrollheight: '10',
    numvisibleplot: '10',
    drawcrossline: '1',
    theme: 'fusion'
  },
  categories: [
    {
      category: [
        {
          label: 'Jan'
        },
        {
          label: 'Feb'
        },
        {
          label: 'Mar'
        },
        {
          label: 'Apr'
        },
        {
          label: 'May'
        },
        {
          label: 'Jun'
        },
        {
          label: 'Jul'
        },
        {
          label: 'Aug'
        },
        {
          label: 'Sep'
        },
        {
          label: 'Oct'
        },
        {
          label: 'Nov'
        },
        {
          label: 'Dec'
        },
      ]
    }
  ],
  dataset: [
    {
      seriesname: 'Emails',
      plottooltext: 'Emails: $dataValue',
      data: [
        {
          value: '71045'
        },
        {
          value: '52949'
        },
        {
          value: '67474'
        },
        {
          value: '111173'
        },
        {
          value: '133762'
        },
        {
          value: '130548'
        },
        {
          value: '280195'
        },
        {
          value: '173419'
        },
        {
          value: '176578'
        },
        {
          value: '105483'
        },
        {
          value: '40211'
        },
        {
          value: '117109'
        },
      ]
    },
    {
      seriesname: 'Phone',
      renderas: 'area',
      showanchors: '0',
      plottooltext: 'phone: $dataValue',
      data: [
        {
          value: '24598'
        },
        {
          value: '18302'
        },
        {
          value: '22162'
        },
        {
          value: '40696'
        },
        {
          value: '47420'
        },
        {
          value: '49981'
        },
        {
          value: '97230'
        },
        {
          value: '73162'
        },
        {
          value: '60668'
        },
        {
          value: '34594'
        },
        {
          value: '12567'
        },
        {
          value: '39907'
        },
      ]
    },
    {
      seriesname: 'Whatsapp',
      parentyaxis: 'S',
      renderas: 'line',
      plottooltext: '$dataValue Whatsapp received',
      showvalues: '0',
      data: [
        {
          value: '28.0'
        },
        {
          value: '35.2'
        },
        {
          value: '23.9'
        },
        {
          value: '11.8'
        },
        {
          value: '18.0'
        },
        {
          value: '26.9'
        },
        {
          value: '11.1'
        },
        {
          value: '11.2'
        },
        {
          value: '24.0'
        },
        {
          value: '18.9'
        },
        {
          value: '35.6'
        },
        {
          value: '37.9'
        },
      ]
    }
  ]
};
@Component({
  selector: 'app-leads-chart',
  templateUrl: './leads-chart.component.html',
  styleUrls: ['./leads-chart.component.css']
})
export class LeadsChartComponent implements OnInit {
  width = 600;
  height = 400;
  type = 'scrollcombidy2d';
  dataFormat = 'json';
  dataSource = data;
  constructor() { }

  ngOnInit(): void {
  }

}
