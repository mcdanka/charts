import { Component, Input, OnChanges } from '@angular/core';
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
export class GraphComponent implements OnChanges {

  element: any;
  //NumberofSystems: Number; //added this line
  ctx;
  myChart; //added =[]

  @Input() graphData: GraphData; 
  //@Input() graphDataService: GraphDataService;

  constructor() {
  }

  ngOnChanges() {
    if (this.graphData) { //if there is graph data and graph data has a type
      this.element = document.getElementById('chart');
      this.ctx = this.element.getContext('2d');
      this.createChart();
    


    //added snippet below
  /* this.graphDataService.getGraphData().catch(data => {
     this.element = data 
     this.NumberofSystems = this.element.data[0][1].systems.length
    */ 
     
   };
    
  }

  createChart() {
    //var array=[]; //added
   // for (var i=0; i<this.NumberofSystems; i++){//added 
    this.myChart = new Chart(this.ctx, {
      type: this.graphData.type, //change this to toggle between graphs
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