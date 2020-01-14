import { Component, Input, OnChanges } from '@angular/core';
import { Chart } from 'chart.js';

export interface BarGraphData {
  data: number[];
  xaxis: string[];
  yaxis: string;
  graphLabel: string;
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss'],
})
export class BarGraphComponent implements OnChanges {

  element: any;
  ctx;
  myBarChart;

  @Input() barGraphData: BarGraphData;

  constructor(
  ) {
    this.element = document.getElementById('myBarChart');
    this.ctx = this.element.getContext('2d');
    this.createChart();
  }

  ngOnChanges() {
    if (this.barGraphData) {

    }
  }

  createChart() {
    this.myBarChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.barGraphData.xaxis,
        datasets: [{
          label: this.barGraphData.graphLabel,
          data: this.barGraphData.data,
          backgroundColor: this.barGraphData.backgroundColor,
          borderColor: this.barGraphData.borderColor,
          borderWidth: this.barGraphData.borderWidth
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
