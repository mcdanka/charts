import { Injectable } from '@angular/core';
import { GraphData } from 'src/app/components/graph/graph.component';
import { FormsModule, NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { MomentService } from '../moment/moment.service';

imports: [
  BrowserModule,
  FormsModule,
  NgModel
]

export interface OutcomesData {
  pain: number;
  function: number;
  improvement?: number;
  createdAt: string;
  patientId: string;
  caseId: string;
  visit?: 'first-visit' | 'follow-up-visit' | 'last-visit';
}

export interface OutcomesGraph {
  type: 'line';
  data: Number[];
  xaxis: Date [];
  yaxis: string;
  graphLabel: string;
  lineColor: string[];
  lineWidth: number;
}



@Injectable({
  providedIn: 'root'
})

export class GraphDataService {

  filteredOutcomesData: OutcomesData[];
  patientId: string;
  caseId: string;
  graphData: GraphData[];
  outGraph: OutcomesGraph[];

  constructor(
    private moment: MomentService
  ) { }

  getOutcomesData(): OutcomesData[] {
    
    const dataArray = [
      {
        pain: 4,
        function: 80,
        improvement: 50,
        createdAt: '01/09/1988',
        patientId: 'TES234',
        caseId: 'TES001'
      },

      {
        pain: 6,
        function: 50,
        improvement: 10,
        createdAt: '01/09/1990',
        patientId: 'CAR123',
        caseId: 'CAR001'
      },
      {
        pain: 6,
        function: 40,
        improvement: 25,
        createdAt: '02/10/1991',
        patientId: 'ABC456',
        caseId: 'ABC001'
      },
      {
        pain: 6,
        function: 40,
        improvement: 66,
        createdAt: '04/30/2000',
        patientId: 'DIS101',
        caseId: 'DIS001'
      },
      {
        pain: 5,
        function: 91,
        improvement: 88,
        createdAt: '04/30/2000',
        patientId: 'NEY202',
        caseId: 'NEY001'
      },
      {
        pain: 1,
        function: 70,
        improvement: 14,
        createdAt: '06/12/2009',
        patientId: 'BEY342',
        caseId: 'BEY001'

      },
      {
        pain: 0,
        function: 95,
        improvement: 72,
        createdAt: '09/30/1998',
        patientId: 'CAR123',
        caseId: 'CAR002'
      },
      {
        pain: 9,
        function: 100,
        improvement: 20,
        createdAt: '03/28/2000',
        patientId: 'JAY800',
        caseId: 'JAY001'
      },
      {
        pain: 10,
        function: 10,
        improvement: 92,
        createdAt: '05/30/2000',
        patientId: 'CAR123',
        caseId: 'CAR003'
      },
      {
        pain: 3,
        function: 30,
        improvement: 54,
        createdAt: '05/10/1996',
        patientId: 'MEN900',
        caseId: 'MEN001'
      }
    ]


    return dataArray.sort((a, b) => this.moment.convertDateStringToNumber(a.createdAt, 'MM/DD/YYYY') - this.moment.convertDateStringToNumber(b.createdAt, 'MM/DD/YYYY'));
  }





  filterOutcomesDataByPatientIdAndCaseId(patientId: string, caseId: string) {
    const allOutcomesData = this.getOutcomesData();
    return allOutcomesData.filter(record => record.patientId === patientId && record.caseId === caseId);
    // if (caseId){
    //   filter = this.outcomesData.filter(function(out) { patientId === out.patientId && caseId === out.caseId});
    // }
    // else { 
    //  filter = this.outcomesData.filter(function(out) { patientId === out.patientId});
    //   }
    //   if (caseId){
    //   for (var i=0; i<this.outcomesData.length; i++){
    //    if (patientId == this.outcomesData[i].patientId && caseId == this.outcomesData[i].caseId){
    //       filter.push(this.outcomesData[i]);
    //    }
    //   }
    // }
    //   else {
    //     for (var i=0; i<this.outcomesData.length; i++){
    //      if (patientId == this.outcomesData[i].patientId){
    //         filter.push(this.outcomesData[i]);
    //      }
    //     }
    // }
    //   console.log(filter);
    //   return filter;
  }

  printOut(data: OutcomesData[]){
    this.filteredOutcomesData = data;
    console.log("tHIS IS DATA", data);
    if (this.filteredOutcomesData) {

      let painNum = [];
      let improv = [];
      let func = [];
      let created = [];

      for (let i = 0; i < this.filteredOutcomesData.length; i++) {
        painNum.push(this.filteredOutcomesData[i].pain);
        improv.push(this.filteredOutcomesData[i].improvement);
        func.push(this.filteredOutcomesData[i].function);
        created[i] = new Date (this.filteredOutcomesData[i].createdAt);
       }

      console.log(painNum, improv, func, created);



      for (var index = 0; index < 3; index++) {
        const newGraph = {} as OutcomesGraph;
        //this.outGraph.push(newGraph);
        newGraph.xaxis = created;
        newGraph.type = 'line';
        newGraph.lineColor = ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'];
        newGraph.graphLabel = "Outcomes Graph";
        newGraph.lineWidth = 1;



        if (index == 0) {
          newGraph.data = painNum;
          newGraph.yaxis = "PAIN";

        }
        else if (index == 1) {
          newGraph.data = improv;
          newGraph.yaxis = "IMPROVEMENT";

        }
        else if (index == 2) {
          newGraph.data = func;
          newGraph.yaxis = "FUNCTION";

        }

       const graph = newGraph;
        const canvas = document.getElementById(`chart${index}`) as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        this.createChartOutcomes(ctx, graph, index);
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
  

  createChartOutcomes(element, graph, index) {

    var chart = [new Chart(element, {
      responsive: true,
      type: graph.type, //change this to toggle between graphs
      data: {
        labels: graph.xaxis,
        datasets: [{
          label: graph.graphLabel,
          data: graph.data,
          borderColor: graph.lineColor[index],
          lineWidth: graph.lineWidth,

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
          text: graph.yaxis.toUpperCase(graph.yaxis) + " TEST DATA",
          fontColor: "#FF0000"


        }
      }
    })];


    return chart;



  }




  getGraphData(): GraphData[] {
    return [
      {
        type: 'bar',
        data: [1, 2, 3, 4, 6, 2, 4, 1, 8, 6, 7, 8],
        xaxis: ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'],
        yaxis: 'value',
        graphLabel: 'Test Graph',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
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
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        lineWidth: 1,
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
      {
        type: 'line',
        data: [1, 2, 3, 4, 6, 2, 4, 1, 8, 6, 7, 8],
        xaxis: ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'],
        yaxis: 'value',
        graphLabel: 'Test Graph',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
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
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        lineWidth: 1,
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
      {
        type: 'pie',
        data: [1, 2, 3, 4, 6, 2, 4, 1, 8, 6, 7, 8],
        xaxis: ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'],
        yaxis: 'value',
        graphLabel: 'Test Graph',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
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
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        lineWidth: 1,
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },

      {
        type: 'doughnut',
        data: [1, 2, 3, 4, 6, 2, 4, 1, 8, 6, 7, 8],
        xaxis: ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'],
        yaxis: 'value',
        graphLabel: "Test Data",
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
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
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        lineWidth: 1,
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1

      }

    ]

  }


}



