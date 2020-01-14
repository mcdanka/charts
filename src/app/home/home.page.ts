import { Component, OnInit } from '@angular/core';
import { GraphData } from '../components/graph/graph.component';
import { GraphDataService } from '../services/graph-data/graph-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  GraphData = {} as GraphData;

  constructor(
    private graphService: GraphDataService
  ) {}

  ngOnInit() {
    this.getGraphData();
    console.log(this);
  }

  async getGraphData() {
    this.GraphData = await this.graphService.getGraphData();
  }


}
