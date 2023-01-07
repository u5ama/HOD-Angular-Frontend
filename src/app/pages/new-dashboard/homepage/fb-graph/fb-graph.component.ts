import { Component, OnInit } from '@angular/core';
const data = {
  chart: {
    caption: '',
    yaxisname: '',
    yAxisValuesPadding: '10',
    yAxisValuesMargin: '10',
    valuePadding: '5',
    subcaption: '',
    numdivlines: '3',
    showvalues: '0',
    legenditemfontsize: '15',
    legenditemfontbold: '1',
    legendPosition: 'top',
    adjustDiv: '0',
    numDivLines: '9',
    plottooltext: '',
    theme: 'fusion'
  },
  categories: [
    {
      category: [
        {
          label: 'Jan 1'
        },
        {
          label: 'Jan 2'
        },
        {
          label: 'Jan 3'
        },
        {
          label: 'Jan 4'
        },
        {
          label: 'Jan 5'
        },
        {
          label: 'Jan 6'
        },
        {
          label: 'Jan 7'
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: 'Lead Converted',
      data: [
        {
          value: '55'
        },
        {
          value: '45'
        },
        {
          value: '52'
        },
        {
          value: '29'
        },
        {
          value: '48'
        },
        {
          value: '28'
        },
        {
          value: '32'
        }
      ]
    },
    {
      seriesname: 'Total Cost',
      data: [
        {
          value: '50'
        },
        {
          value: '30'
        },
        {
          value: '49'
        },
        {
          value: '22'
        },
        {
          value: '43'
        },
        {
          value: '14'
        },
        {
          value: '31'
        }
      ]
    },
  ]
};
@Component({
  selector: 'app-fb-graph',
  templateUrl: './fb-graph.component.html',
  styleUrls: ['./fb-graph.component.css']
})
export class FbGraphComponent implements OnInit {
  width = 600;
  height = 400;
  type = 'msspline';
  dataFormat = 'json';
  dataSource = data;
  constructor() { }

  ngOnInit(): void {
  }

}
