import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

export interface PieGraphData {
  data: number[];
  graphLabel: string;
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

@Component({
  selector: 'app-pie-graph',
  templateUrl: './pie-graph.component.html',
  styleUrls: ['./pie-graph.component.scss'],
})
export class PieGraphComponent implements OnInit {

  element: any = document.getElementById('myPieChart');
  ctx;
  myPieChart;

  @Input() pieGraphData: PieGraphData;

  constructor(
    private chartJS: Chart
  ) { }

  ngOnInit() {
    this.ctx = this.element.getContext('2d');
    this.createChart();
  }

  createChart() {
    this.myPieChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        datasets: [{
          label: this.pieGraphData.graphLabel,
          data: this.pieGraphData.data,
          backgroundColor: this.pieGraphData.backgroundColor,
          borderColor: this.pieGraphData.borderColor,
          borderWidth: this.pieGraphData.borderWidth
        }],
        labels: [
          'Red',
          'Yellow',
          'Blue'
        ]
      },
      options: {}
    });
  }

}
