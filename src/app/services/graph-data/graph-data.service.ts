import { Injectable } from '@angular/core';

export interface OutcomesData {
  pain: number;
  function: number;
  improvement?: number;
  createdAt: string;
  patientId: string;
  caseId: string;
  visit?: 'first-visit' | 'follow-up-visit' | 'last-visit';
}



@Injectable({
  providedIn: 'root'
})

export class GraphDataService {


  constructor(
  ) { }

  getGraphData() {
    return [
      {
        "name": "Germany",
        "series": [
          {
            "name": "1990",
            "value": 62000000
          },
          {
            "name": "2010",
            "value": 73000000
          },
          {
            "name": "2011",
            "value": 89400000
          }
        ]
      },

      {
        "name": "USA",
        "series": [
          {
            "name": "1990",
            "value": 250000000
          },
          {
            "name": "2010",
            "value": 309000000
          },
          {
            "name": "2011",
            "value": 311000000
          }
        ]
      },

      {
        "name": "France",
        "series": [
          {
            "name": "1990",
            "value": 58000000
          },
          {
            "name": "2010",
            "value": 50000020
          },
          {
            "name": "2011",
            "value": 58000000
          }
        ]
      },
      {
        "name": "UK",
        "series": [
          {
            "name": "1990",
            "value": 57000000
          },
          {
            "name": "2010",
            "value": 62000000
          }
        ]
      }
    ];
  }


}



