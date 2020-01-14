import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

export interface LineGraphData {
  data: number[];
  xaxis: string[];
  yaxis: string;
  graphLabel: string;
  backgroundColor: string[];
  lineColor: string[];
  lineWidth: number
}

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
})
export class LineGraphComponent implements OnInit {

  element: any = document.getElementById('myLineChart');
  ctx;
  myLineChart;

  @Input() lineGraphData: LineGraphData;

  constructor(
    private chartJS: Chart
  ) { }

  ngOnInit() {
    this.ctx = this.element.getContext('2d');
    this.createChart();
  }

  createChart() {
    this.myLineChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.lineGraphData.xaxis,
        datasets: [{
          label: this.lineGraphData.graphLabel,
          data: this.lineGraphData.data,
          backgroundColor: this.lineGraphData.backgroundColor,
          lineColor: this.lineGraphData.lineColor,
          lineWidth: this.lineGraphData.lineWidth,
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
    })
  }




}
