import { Component, OnInit, Input } from '@angular/core';
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
export class BarGraphComponent implements OnInit {

  element: any = document.getElementById('myBarChart');
  ctx;
  myBarChart;


  @Input() barGraphData: BarGraphData;

  constructor(
    private chartJS: Chart
  ) { }

  ngOnInit() {
    this.ctx = this.element.getContext('2d');
    this.createChart();
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
