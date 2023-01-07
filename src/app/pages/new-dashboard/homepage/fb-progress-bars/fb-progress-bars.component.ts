import { Component, OnInit } from '@angular/core';
const data = {
  chart: {
    caption: '',
    yaxisname: '',
    legendPosition: 'top-left',
    showPlotBorder: '0',
    showBorder: '0',
    drawAnchors: '0',
    numDivLines: '0',
    divLineAlpha: '0',
    aligncaptionwithcanvas: '0',
    plottooltext: '',
    showLabels: '0',
    showYAxisValues: '0',
    showValues: '0',
    theme: 'fusion',
    plotSpacePercent: '80',
    RoundRadius: '90',
  },
  data: [
    {
      label: 'Leads',
      value: '100',
      color: '#F68784'
    },
    {
      label: 'On-Facebook Leads',
      value: '90',
      color: '#FCB451'
    },
    {
      label: 'Messaging Conversation',
      value: '80',
      color: '#FFD76A'
    },
    {
      label: 'Purchases',
      value: '70',
      color: '#6CD6B3'
    },
    {
      label: 'Purchase Value',
      value: '30',
      color: '#00AD74'
    }
  ],
  annotations: {
    groups: [{
      items: [{
        type: 'text',
        color: '#606060',
        text: 'Leads',
        x: '$dataset.0.set.0.STARTX',
        y: '$dataset.0.set.0.STARTY-15',
        align: 'LEFT'
      },
        {
          type: 'text',
          color: '#1D1D1D',
          text: '38.1M',
          x: '$dataset.0.set.0.ENDX',
          y: '$dataset.0.set.0.STARTY-15',
          align: 'RIGHT'
        }],
    },
      {
        items: [{
          type: 'text',
          color: '#606060',
          text: 'On-Facebook Leads',
          x: '$dataset.0.set.1.STARTX',
          y: '$dataset.0.set.1.STARTY-15',
          align: 'LEFT'
        },
          {
            type: 'text',
            color: '#1D1D1D',
            text: '145.4k',
            x: '$dataset.0.set.1.ENDX',
            y: '$dataset.0.set.1.STARTY-15',
            align: 'RIGHT'
          }],
      },
      {
        items: [{
          type: 'text',
          color: '#606060',
          text: 'Messaging Conversation',
          x: '$dataset.0.set.2.STARTX',
          y: '$dataset.0.set.2.STARTY-15',
          align: 'LEFT'
        },
          {
            type: 'text',
            color: '#1D1D1D',
            text: '3.42k',
            x: '$dataset.0.set.2.ENDX',
            y: '$dataset.0.set.2.STARTY-15',
            align: 'RIGHT'
          }],
      },
      {
        items: [{
          type: 'text',
          color: '#606060',
          text: 'Purchases',
          x: '$dataset.0.set.3.STARTX',
          y: '$dataset.0.set.3.STARTY-15',
          align: 'LEFT'
        },
          {
            type: 'text',
            color: '#1D1D1D',
            text: '441',
            x: '$dataset.0.set.3.ENDX',
            y: '$dataset.0.set.3.STARTY-15',
            align: 'RIGHT'
          }],
      },
      {
        items: [{
          type: 'text',
          color: '#606060',
          text: 'Purchase Value',
          x: '$dataset.0.set.4.STARTX',
          y: '$dataset.0.set.4.STARTY-15',
          align: 'LEFT'
        },
          {
            type: 'text',
            color: '#1D1D1D',
            text: '70',
            x: '$dataset.0.set.4.ENDX+50',
            y: '$dataset.0.set.4.STARTY-15',
            align: 'RIGHT'
          }],
      }]
  }
};
@Component({
  selector: 'app-fb-progress-bars',
  templateUrl: './fb-progress-bars.component.html',
  styleUrls: ['./fb-progress-bars.component.css']
})
export class FbProgressBarsComponent implements OnInit {
  width = 600;
  height = 400;
  type = 'bar2d';
  dataFormat = 'json';
  dataSource = data;
  constructor() { }

  ngOnInit(): void {
  }

}
