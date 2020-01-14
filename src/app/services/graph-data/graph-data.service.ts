import { Injectable } from '@angular/core';
import { BarGraphData } from 'src/app/components/bar-graph/bar-graph.component';
import { LineGraphData } from 'src/app/components/line-graph/line-graph.component';
import { PieGraphData } from 'src/app/components/pie-graph/pie-graph.component';

@Injectable({
  providedIn: 'root'
})
export class GraphDataService {

  constructor() { }

  async getBarGraphData() {
    const data: BarGraphData = {
      data: [8, 9, 10],
      xaxis: ['blah1', 'blah2', 'blah3'],
      yaxis: 'value',
      graphLabel: 'Test Graph',
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
    return data;
  }

  async getLineGraphData() {
    const data: LineGraphData = {
      data: [1, 2, 3, 4, 6, 2, 4, 1, 8, 6, 7, 8],
      xaxis: ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'],
      yaxis: 'value',
      graphLabel: 'Test Line Graph',
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      lineColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      lineWidth: 1
    }
    return data;
  }

  async getPieGraphData() {
    const data: PieGraphData = {
      data: [15, 20, 65],
      graphLabel: 'Test Pie Chart',
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
    return data;
  }
}

