import { Component, Input, OnChanges } from '@angular/core';
import { Chart } from 'chart.js';

export interface GraphData {
  data: number[];
  xaxis: string[];
  yaxis: string;
  graphLabel: string;
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
  lineWidth: number;
  lineColor: string[];
  //type: string // 'bar' | 'line' | 'pie'
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnChanges {

  element: any;
  ctx;
  myChart;

  @Input() graphData: GraphData;

  constructor() {
  }

  ngOnChanges() {
    if (this.graphData) {
      this.element = document.getElementById('chart');
      this.ctx = this.element.getContext('2d');
      this.createChart();

    }
  }

  createChart() {
    this.myChart = new Chart(this.ctx, {
      type: 'bar', // this.graphData.type,
      data: {
        labels: this.graphData.xaxis,
        datasets: [{
          label: this.graphData.graphLabel,
          data: this.graphData.data,
          backgroundColor: this.graphData.backgroundColor,
          borderColor: this.graphData.borderColor,
          borderWidth: this.graphData.borderWidth
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }




}
