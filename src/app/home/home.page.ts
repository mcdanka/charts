import { Component, OnInit } from '@angular/core';
import { GraphData } from '../components/graph/graph.component';
import { GraphDataService, OutcomesData } from '../services/graph-data/graph-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {

  graphData: GraphData[];
  outcomesData: OutcomesData[];
  //outGraph: OutcomesGraph[];

  constructor(
    private graphService: GraphDataService
  ) { }

  async ngOnInit() {
    this.graphData = await this.getGraphData();
    this.outcomesData = await this.getOutcomesData();
  // this.outGraph = await this.getOutcomesGraph();

  }

  async getGraphData() {
    return await this.graphService.getGraphData();
  }

  async getOutcomesData() {
    return await this.graphService.getoutcomesData();
  }

  // async getOutcomesGraph() {
  //    return await this.graphService.getOutcomesGraph();
  //  }
}
