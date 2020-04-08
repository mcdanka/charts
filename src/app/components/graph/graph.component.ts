import { Component, Input, OnChanges } from '@angular/core';
import { GraphDataService } from 'src/app/services/graph-data/graph-data.service';


export interface OutcomesData {
  pain: number;
  function: number;
  improvement?: number;
  createdAt: string;
  patientId: string;
  caseId: string;
}

export interface GraphData {
  
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

  single: any[];
  multi: any;
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Patient Information';
  yAxisLabel: string = 'Change';
 // timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };



  constructor(
    private graphService: GraphDataService
  ) {
   // Object.assign(this, { GraphDataService })
   }

  ngOnChanges() {
    //if (this.patientId && this.caseId) {
      //this.multi = this.graphService.getGraphData();
      // this.multi.forEach(record => {
      //   this.single = record;
        
      // });
  //  }
  }

  




}