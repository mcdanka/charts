import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { GraphDataService } from 'src/app/services/graph-data/graph-data.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

export interface OutcomesGraph {
  type: 'line';
  data: Number[];
  xaxis: Date[];
  yaxis: string;
  graphLabel: string;
  lineColor: string[];
  lineWidth: number;
}

export interface OutcomesData {
  pain: number;
  function: number;
  improvement?: number;
  createdAt: string;
  patientId: string;
  caseId: string;
}


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})



export class GraphComponent implements AfterViewInit {

  patientId: string;
  caseId: string;
  graphData: GraphData[];
  outcomesData: OutcomesData[];
  filteredOutcomesData: OutcomesData[];
  outGraph: OutcomesGraph[];


  constructor(
    private graphService: GraphDataService
  ) {
    this.graphData = this.graphService.getGraphData();
    this.outcomesData = this.graphService.getoutcomesData();
    this.outGraph = [];
  }

  ngAfterViewInit() {

  
   
    //FOR OUTCOMES DATA
   // this.graphService.printOut(this.filteredOutcomesData);
  }


  populateGraphs() {
    console.log(this.patientId, this.caseId);
    this.filteredOutcomesData = this.graphService.filterOutcomesData(this.patientId, this.caseId);
    console.log(this.filteredOutcomesData);

    this.graphService.printOut(this.filteredOutcomesData);
  }

  showGraphData(){

//     if (!document.getElementById("newGraphs")){
      
// // document.getElementById("newGraphs").innerHTML="<div class='custom-margin' *ngFor='let graph of graphData; let i = index>" +
// // "<canvas [id]=" + "'graph' + i" + "> </canvas></div>";
//     }

    if (this.graphData) {

      
      for (let index = 0; index < this.graphData.length; index++) {
        const graph = this.graphData[index];
        const canvas = document.getElementById(`graph${index}`) as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        this.graphService.createChart(ctx, graph);
      }

    }
  }
  removeGraphData(){
    if (this.graphData) {

      const canvas = [];
      for (let index = 0; index < this.graphData.length; index++) {
         canvas.push(document.getElementById(`graph${index}`) as HTMLCanvasElement);
      }
      for (let index = 0; index < canvas.length; index++) {
       canvas[index].remove();
       }
 


    }
  }

  // createChart(element, graph) {

  //   var chart = [new Chart(element, {
  //     responsive: true,
  //     type: graph.type, //change this to toggle between graphs
  //     data: {
  //       labels: graph.xaxis,
  //       datasets: [{
  //         label: graph.graphLabel,
  //         data: graph.data,
  //         backgroundColor: graph.backgroundColor,
  //         borderColor: graph.borderColor,
  //         borderWidth: graph.borderWidth
  //       }]
  //     },
  //     options: {

  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             beginAtZero: true
  //           }
  //         }]
  //       },

  //       title: { //added the chart title and formatting
  //         display: true,
  //         fontSize: 20,
  //         fontFamily: "Cursive",
  //         text: graph.type.toUpperCase(graph.type) + " TEST DATA",
  //         fontColor: "#FF0000"


  //       }
  //     }
  //   })];


  //   return chart;



  // }
}