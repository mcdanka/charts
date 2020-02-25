import { GraphData } from 'src/app/components/graph/graph.component';
import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { GraphDataService } from 'src/app/services/graph-data/graph-data.service';

export interface GraphData {
  data: Number[];
  xaxis: string[];
  yaxis: string;
  graphLabel: string;
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
  lineWidth: number;
  lineColor: string[];
  type: 'bar' | 'line' | 'pie' | 'doughnut';
}


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})



export class GraphComponent implements AfterViewInit {


  graphData: GraphData[];



  constructor(
    private graphService: GraphDataService
  ) {
    this.graphData = this.graphService.getGraphData();
  }


  ngAfterViewInit() {
    console.log(this.graphData);
    if (this.graphData) {
      
      for (let index = 0; index < this.graphData.length; index++) {
        const graph = this.graphData[index];
        const canvas = document.getElementById(`graph${index}`) as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        this.createChart(ctx, graph);
      }


    }
  }


  createChart(element, graph) {

    var chart = [new Chart(element, {
      responsive: true,
      type: graph.type, //change this to toggle between graphs
      data: {
        labels: graph.xaxis,
        datasets: [{
          label: graph.graphLabel,
          data: graph.data,
          backgroundColor: graph.backgroundColor,
          borderColor: graph.borderColor,
          borderWidth: graph.borderWidth
        }]
      },
      options: {

        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },

        title: { //added the chart title and formatting
          display: true,
          fontSize: 20,
          fontFamily: "Cursive",
          text: graph.type.toUpperCase(graph.type) + " TEST DATA",
          fontColor: "#FF0000"


        }
      }
    })];


    return chart;



  }


}
