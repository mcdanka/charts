import { Component, Input, OnChanges } from '@angular/core';
import { GraphDataService } from 'src/app/services/graph-data/graph-data.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';


export interface OutcomesData {
  pain: number;
  function: number;
  improvement?: number;
  createdAt: string;
  patientId: string;
  caseId: string;
}

export interface GraphData {
  name: string;
  series: any[];
}


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})

export class GraphComponent implements OnChanges{

 // graphService: GraphDataService


  @Input() patientId: string;
  @Input() caseId: string;

  single: any;
  multi: any[];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showLegend: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Patient Information';
  yAxisLabel: string = 'Change';
  legendTitle: string = 'Type';
  gradient: boolean = true;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
 // timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };



  constructor(  private graphService: GraphDataService) 
  {  }

  ngOnChanges() {
    const pIds = this.graphService.getdistinctPatientIDs();
    this.multi = [];

    //Creating the different charts for each unique id
    pIds.forEach(id => {
      console.log(id);
      const temp = {} as GraphData;
      temp.name = id;
      temp.series = this.graphService.getGraphData(id);
      this.multi.push(temp);
    });

  
    //if (this.patientId && this.caseId) {
      //this.multi = this.graphService.getGraphData();
      // this.multi.forEach(record => {
      //   this.single = record;
        
      // });
  //  }


  }


  




}