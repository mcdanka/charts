import { GraphData } from 'src/app/components/graph/graph.component';
import { Component, Input, OnChanges } from '@angular/core';
import { Chart } from 'chart.js';

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
  type: 'bar' | 'line' | 'pie'| 'doughnut';
}


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})



export class GraphComponent implements OnChanges {


  @Input() graphData: GraphData;



  constructor() { }





  ngOnChanges() {


    //Due to the fact that graphData alreday comes as an array, we would just need to access its individual
    //data and give each its individual canvas
    var ctx = [];
    var numEle = [];
    if (this.graphData) {

      for (var i = 0; i < 4; i++) {
        numEle[i] = document.getElementById("chart" + i); //grabs the different canvases from the html page
        ctx[i] = numEle[i].getContext('2d'); //gives each its own html canvas

        //if statements only sends the graph with a particular type to createChart function
        if (this.graphData.type == 'bar' && i==0) {
          this.createChart(ctx[i], this.graphData);
        }
        else if (this.graphData.type == 'line' && i == 1) {
          this.createChart(ctx[i], this.graphData);
        }
        else if (this.graphData.type == 'pie' && i == 2)  {
          this.createChart(ctx[i], this.graphData);
        }
        else if (this.graphData.type == 'doughnut' && i == 3)  {
          this.createChart(ctx[i], this.graphData);
        }
      }
    }







  }


  createChart(element, graph) {

    var chart = [new Chart(element, {
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
