import { Component, Input, ViewChildren, AfterViewInit} from '@angular/core';
import { Chart } from 'chart.js';
//import { GraphDataService } from 'src/app/services/graph-data/graph-data.service';

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
  type: 'bar' | 'line' | 'pie';
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements AfterViewInit {

  @ViewChildren('myCharts') allCharts: any;

  element: any;
  //NumberofSystems: Number; //added this line
  ctx;
  //myChart; //added =[]

  @Input() graphData: GraphData[];
  charts = []; 
  //@Input() graphDataService: GraphDataService;

  constructor() {
    
  }

  ngAfterViewInit() {

    // //this.charts = this.allCharts.map( (element: any, index: number) => {
    //   //console.log(this.element, index);
    //   //console.log(this.graphData[index]);
    //   this.charts.push(this.createChart(this.graphData[index], this.element));
    //   console.log(this.charts);
    // });

    this.charts = this.allCharts.map( (element, index) => {
    this.charts.push(this.createChart(this.graphData[index], this.element));
      
    });
    console.log(this.charts);
  }

  


  // ngOnChanges() {
  //   if (this.graphData) { //if there is graph data and graph data has a type
  //     this.element = document.getElementById('chart');
  //     this.ctx = this.element.getContext('2d');
  //     this.createChart();
    


  //   //added snippet below
  // /* this.graphDataService.getGraphData().catch(data => {
  //    this.element = data 
  //    this.NumberofSystems = this.element.data[0][1].systems.length
  //   */ 
     
  //  };
    
  // }

  createChart(graph: GraphData, element) {
    //var array=[]; //added
   // for (var i=0; i<this.NumberofSystems; i++){//added 
    return new Chart(this.element.getContext('2d'), {
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
        }
      }
    });
  
  //  array.push(this.myChart);//added this line
 // }//added
 // this.createChartnow(array); //added
  
  }
  //added the function below
  /*createChartnow(chartData){//added
    for(var j = 0; j<this.NumberofSystems;j++)
  {
  let htmlRef = this.element.nativeElement.select('.class');
  console.log(htmlRef);
  var tempChart = new Chart(htmlRef,chartData[j]);
  this.myChart.push(tempChart);
  }   
  }//added
*/

}