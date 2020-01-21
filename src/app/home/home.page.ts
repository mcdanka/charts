import { Component, OnInit } from '@angular/core';
import { GraphData } from '../components/graph/graph.component';
import { GraphDataService } from '../services/graph-data/graph-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  graphData: GraphData[]; 

  constructor(
    private graphService: GraphDataService
  ) {}

  async ngOnInit() {   
      this.graphData = await this.getGraphData();
  }

  async getGraphData() {
    return await this.graphService.getGraphData();
  }


}
