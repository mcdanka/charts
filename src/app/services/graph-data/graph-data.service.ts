import { Injectable } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

export interface OutcomesData {
  pain: number;
  function: number;
  improvement?: number;
  createdAt: string;
  patientId: string;
  caseId: string;
  visit?: 'first-visit' | 'follow-up-visit' | 'last-visit';
  changeInPain: number;
  changeInFunction: number;
  ChangeInImprovement?: number;
}

export interface Series {
  name: string[];
  value: number[];
}

@Injectable({
  providedIn: 'root'
})

export class GraphDataService {

  constructor(
  ) { }

  generateOutcomesData() {
    const outData: OutcomesData[] = [];
    let month = 0;
    let day = 0;
    let year = 0;
    for (var i = 0; i < 1000; i++) {
      // TODO: Convert All Numbers to Whole Numbers
      const outcomesArray = {} as OutcomesData;
      outcomesArray.pain = Math.random() * 10;
      outcomesArray.function = Math.random() * 100;
      outcomesArray.improvement = Math.random() * 100;
      month = Math.floor((Math.random() * (12 - 1)) + 1);
      year = Math.floor((Math.random() * (2020 - 1950)) + 1950);
      if (month == 2 && (year % 400 == 0)) {
        day = Math.floor((Math.random() * (28 - 1)) + 1);
      }
      else if (month == 2 && (year % 400 != 0)) {
        day = Math.floor((Math.random() * (27 - 1)) + 1);
      }
      else if ((month == 9) || (month == 4) || (month == 5) || (month == 11)) {
        day = Math.floor((Math.random() * 29) + 1);
      }
      else {
        day = Math.floor((Math.random() * 30) + 1);
      }

      outcomesArray.createdAt = month.toString() + "/" + day.toString() + "/" + year.toString();
      outcomesArray.patientId = "PA" + (Math.floor((Math.random() * (10000 - 1000)) + 1000)).toString();
      outcomesArray.caseId = "CA" + (Math.floor((Math.random() * (2000 - 1000)) + 1000)).toString();
      outData.push(outcomesArray);

    }
    console.log(outData["1:10"]);
    //sorting by dates coded as strings

    // TODO: After sorting by createdAt, group records by patientID and caseID this all should probably happen in a separate function - each function should
    // only have one primary purpose
    outData.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
    outData.sort((a, b) => (a.patientId > b.patientId) ? 1 : -1);
    outData.sort((a, b) => (a.caseId > b.caseId) ? 1 : -1);


    return outData;
  }


  calculateChange() {
    const edittedData = this.generateOutcomesData();
    const uniqueData = [];

    const finalOut = [] as OutcomesData[];

    const distinctPatientId = [...new Set(edittedData.map(x => x.patientId))];

    // const distinctPatientandCaseId = new Map();
    // for (const record of edittedData){
    //   if (!((distinctPatientandCaseId.has(record.patientId)) && 
    //   (distinctPatientandCaseId.has(record.caseId)))) {
    //     distinctPatientandCaseId.set(record.patientId, true);
    //    uniqueData.push({
    //       patientId: record.patientId,
    //       caseId: record.caseId,
    //       createdAt: record.createdAt
    //     });

    //   }
    // }

    // TODO: Add comments for each major step - I got confused here
    console.log(distinctPatientId);
    distinctPatientId.forEach(pId => {
      let count = 0;
      for (var index = 0; index < edittedData.length; index++) {

        if (edittedData[index].patientId.localeCompare(pId) == 0) {
          if (count == 0) {
            edittedData[index].visit = "first-visit";
            edittedData[index].changeInPain = 0;
            edittedData[index].changeInFunction = 0;
            edittedData[index].ChangeInImprovement = 0;
            count++;
          }
          else {
            edittedData[index].changeInPain = edittedData[index].pain - edittedData[index - 1].pain;
            edittedData[index].changeInFunction = edittedData[index].function - edittedData[index - 1].function;

            edittedData[index].ChangeInImprovement = edittedData[index].improvement - edittedData[index - 1].improvement;
            edittedData[index].visit = "follow-up-visit";
          }

        }
        else if (count == 0) {
          break;
        }
        else if (edittedData[index].patientId.localeCompare(pId) != 0 && count > 0) {
          let j = index - 1;
          edittedData[j].visit = "last-visit";
        }

        if (edittedData[index].patientId.localeCompare(pId) == 0) {
          console.log(edittedData[index]);
        }
      }

    });



    return edittedData;





  }


  getGraphData() {
    // TODO: The graph should be a bar graph with three bars - change in pain, function, improvement. Date is not needed.
    const data = this.calculateChange();
    const distinctPatientId = [...new Set(data.map(x => x.patientId))];
    const graphs = [];
    let index = 0;
    distinctPatientId.forEach(pId => {
      let date = [];
      let pain = [];
      let func = [];
      let improvement = [];
      for (var i = 0; i < data.length; i++) {
        //  graphs[index]={
        //    name: pId,
        //    series: []
        //  }
        if (data[i].patientId.localeCompare(pId) == 0) {
          date[i] = data[i].createdAt;
          pain[i] = data[i].changeInPain;

          func[i] = data[i].changeInFunction;

          improvement[i] = data[i].ChangeInImprovement;
        }
      }


      graphs[index] =
      {
        name: pId,
        series: [
          {
            "name": date,
            "value": pain
          },
          {
            "name": date,
            "value": func
          },
          {
            "name": date,
            "value": improvement
          }
        ],

      }


      index++;


    });
    console.log(graphs);
    return graphs;
  }

  //   return [
  //     {
  //       "name": "Germany",
  //       "series": [
  //         {
  //           "name": "1990",
  //           "value": 62000000
  //         },
  //         {
  //           "name": "2010",
  //           "value": 73000000
  //         },
  //         {
  //           "name": "2011",
  //           "value": 89400000
  //         }
  //       ]
  //     },

  //     {
  //       "name": "USA",
  //       "series": [
  //         {
  //           "name": "1990",
  //           "value": 250000000
  //         },
  //         {
  //           "name": "2010",
  //           "value": 309000000
  //         },
  //         {
  //           "name": "2011",
  //           "value": 311000000
  //         }
  //       ]
  //     },

  //     {
  //       "name": "France",
  //       "series": [
  //         {
  //           "name": "1990",
  //           "value": 58000000
  //         },
  //         {
  //           "name": "2010",
  //           "value": 50000020
  //         },
  //         {
  //           "name": "2011",
  //           "value": 58000000
  //         }
  //       ]
  //     },
  //     {
  //       "name": "UK",
  //       "series": [
  //         {
  //           "name": "1990",
  //           "value": 57000000
  //         },
  //         {
  //           "name": "2010",
  //           "value": 62000000
  //         }
  //       ]
  //     }
  //   ];





}

