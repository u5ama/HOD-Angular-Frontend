import { Component, OnInit } from '@angular/core';
const data = {
  chart: {
    caption: 'Monthly',
    legendPosition: 'top',
    legendAllowDrag: '1',
    subcaption: ' ',
    numbersuffix: '',
    showsum: '1',
    plottooltext: '',
    captionAlignment: 'left',
    theme: 'fusion',
    drawcrossline: '1'
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
      seriesname: 'Organic',
      data: [
        {
          value: '400'
        },
        {
          value: '830'
        },
        {
          value: '500'
        },
        {
          value: '420'
        },
        {
          value: '790'
        },
        {
          value: '400'
        },
        {
          value: '830'
        },
        {
          value: '500'
        },
        {
          value: '420'
        },
        {
          value: '790'
        },
        {
          value: '790'
        },
        {
          value: '380'
        }
      ]
    },
    {
      seriesname: 'Referral',
      data: [
        {
          value: '350'
        },
        {
          value: '620'
        },
        {
          value: '410'
        },
        {
          value: '370'
        },
        {
          value: '720'
        },
        {
          value: '350'
        },
        {
          value: '620'
        },
        {
          value: '410'
        },
        {
          value: '370'
        },
        {
          value: '720'
        },
        {
          value: '720'
        },
        {
          value: '310'
        }
      ]
    },
    {
      seriesname: 'Direct',
      data: [
        {
          value: '210'
        },
        {
          value: '400'
        },
        {
          value: '450'
        },
        {
          value: '180'
        },
        {
          value: '570'
        },
        {
          value: '210'
        },
        {
          value: '400'
        },
        {
          value: '450'
        },
        {
          value: '180'
        },
        {
          value: '570'
        },
        {
          value: '570'
        },
        {
          value: '270'
        }
      ]
    },
    {
      seriesname: 'Social',
      data: [
        {
          value: '180'
        },
        {
          value: '330'
        },
        {
          value: '230'
        },
        {
          value: '160'
        },
        {
          value: '440'
        },
        {
          value: '180'
        },
        {
          value: '330'
        },
        {
          value: '230'
        },
        {
          value: '160'
        },
        {
          value: '440'
        },
        {
          value: '440'
        },
        {
          value: '350'
        }
      ]
    },
    {
      seriesname: 'Others',
      data: [
        {
          value: '60'
        },
        {
          value: '200'
        },
        {
          value: '200'
        },
        {
          value: '50'
        },
        {
          value: '230'
        },
        {
          value: '60'
        },
        {
          value: '200'
        },
        {
          value: '200'
        },
        {
          value: '50'
        },
        {
          value: '230'
        },
        {
          value: '230'
        },
        {
          value: '150'
        }
      ]
    },
    {
      seriesname: 'Email',
      data: [
        {
          value: '60'
        },
        {
          value: '200'
        },
        {
          value: '200'
        },
        {
          value: '50'
        },
        {
          value: '230'
        },
        {
          value: '60'
        },
        {
          value: '200'
        },
        {
          value: '200'
        },
        {
          value: '50'
        },
        {
          value: '230'
        },
        {
          value: '230'
        },
        {
          value: '150'
        }
      ]
    },
    {
      seriesname: 'Display',
      data: [
        {
          value: '60'
        },
        {
          value: '200'
        },
        {
          value: '200'
        },
        {
          value: '50'
        },
        {
          value: '230'
        },
        {
          value: '60'
        },
        {
          value: '200'
        },
        {
          value: '200'
        },
        {
          value: '50'
        },
        {
          value: '230'
        },
        {
          value: '230'
        },
        {
          value: '150'
        }
      ]
    },
    {
      seriesname: 'Paid Search',
      data: [
        {
          value: '60'
        },
        {
          value: '200'
        },
        {
          value: '200'
        },
        {
          value: '50'
        },
        {
          value: '230'
        },
        {
          value: '60'
        },
        {
          value: '200'
        },
        {
          value: '200'
        },
        {
          value: '50'
        },
        {
          value: '230'
        },
        {
          value: '230'
        },
        {
          value: '150'
        }
      ]
    }
  ]
};
@Component({
  selector: 'app-website-traffic-source-graph',
  templateUrl: './website-traffic-source-graph.component.html',
  styleUrls: ['./website-traffic-source-graph.component.css']
})
export class WebsiteTrafficSourceGraphComponent implements OnInit {
  width = 600;
  height = 400;
  type = 'stackedcolumn2d';
  dataFormat = 'json';
  dataSource = data;
  constructor() { }

  ngOnInit(): void {
  }

}
