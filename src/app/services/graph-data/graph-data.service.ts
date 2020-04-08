import { Injectable } from '@angular/core';


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
      outcomesArray.pain = Math.ceil(Math.random() * 10);
      outcomesArray.function = Math.ceil(Math.random() * 100);
      outcomesArray.improvement = Math.ceil(Math.random() * 100);
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
      outcomesArray.patientId = "PA" + Math.floor(1000/(i+1)).toString();
      outcomesArray.caseId = "CA" + Math.ceil((i+1)/1000).toString();
      outData.push(outcomesArray);

    }
   // console.log(outData["1:10"].pain);
   

    return outData;
  }


  sortData(){
     // TODO: After sorting by createdAt, group records by patientID and caseID this all should probably happen in a separate function - each function should
    // only have one primary purpose

     //sorting by patientids, caseids and dates coded as strings
    const outData = this.generateOutcomesData();
    outData.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
    outData.sort((a, b) => (a.patientId > b.patientId) ? 1 : -1);
    outData.sort((a, b) => (a.caseId > b.caseId) ? 1 : -1);
    return outData;

  }

  calculateChange() {
    const edittedData = this.sortData();

    const distinctPatientId = [...new Set(edittedData.map(x => x.patientId))];


    // TODO: Add comments for each major step - I got confused here
    //console.log(distinctPatientId);

    //This section uses the unique patient IDs to calculate patient's 
    //change in pain, improvement and function. It also determines, based
    //on cases, if the visit was first, last, or a follow up.
    distinctPatientId.forEach(pId => {
      let count = 0; //keeps track of first visits/no visits
      edittedData[0].visit = "first-visit";
      edittedData[0].changeInPain = 0;
      edittedData[0].changeInFunction = 0;
      edittedData[0].ChangeInImprovement = 0;
      for (var index = 1; index < edittedData.length; index++) {
        let j = index - 1;
        if (edittedData[index].patientId === pId) {
          if (count == 0) {
            edittedData[index].visit = "first-visit";
            edittedData[index].changeInPain = 0;
            edittedData[index].changeInFunction = 0;
            edittedData[index].ChangeInImprovement = 0;
            count = count + 1;
          }
          else {
            count++;
            edittedData[index].changeInPain = edittedData[index].pain - edittedData[j].pain;
            edittedData[index].changeInFunction = edittedData[index].function - edittedData[j].function;

            edittedData[index].ChangeInImprovement = edittedData[index].improvement - edittedData[j].improvement;
            edittedData[index].visit = "follow-up-visit";
          }
        }

        else if (edittedData[index].patientId !== pId && count>0 ) {
          
          edittedData[j].visit = "last-visit";
        }

        // else if (count == 0) { //if no visits
        //   break;
        // }

        // if (edittedData[index].patientId === pId) {
        //   console.log(edittedData[index]);
        // }
      }

    });

   // console.log(edittedData[2].changeInPain);


    return edittedData;


  }


  getGraphData() {
    // TODO: The graph should be a bar graph with three bars - change in pain, function, improvement. Date is not needed.
    const data = this.calculateChange();
    const graphs = [];
    const distinctPatientId = [...new Set(data.map(x => x.patientId))];
    
   let index = 0;
    distinctPatientId.forEach(pId => {
      let date = [];
      let pain = [];
      let func = [];
      let improvement = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].patientId === pId) {

          date.push(data[i].createdAt);
          pain.push(data[i].changeInPain);

          func.push(data[i].changeInFunction);

          improvement.push(data[i].ChangeInImprovement);

        }
        


      }
    // console.log(pain);

      //Calculate Averages of pain, function and improvement
      let sumpain=0;
      let sumfunc =0;
      let sumimprov = 0;
      for (var i=0; i<pain.length; i++){
        sumpain = pain[i]+sumpain;
        sumfunc=func[i] + sumfunc;
        sumimprov=improvement[i]+sumimprov;
      }

      // const avgpain = pain=> pain.reduce((a,b)=>a+b, 0)/pain.length;
      // const avgfunc = func => func.reduce((a,b)=>a+b, 0)/func.length;
      // const avgimprov = improvement => improvement.reduce((a,b)=>a+b, 0)/improvement.length;

      const avgpain = Math.floor(sumpain/pain.length);
      const avgfunc = Math.floor(sumfunc/func.length);
      const avgimprov = Math.floor(sumimprov/improvement.length);

      console.log(avgpain);
      graphs.push(
      {
        name: pId.toString(),
        series: [
          {
            "name": "Pain",
            "value": avgpain
          },
          {
            "name": "Function",
            "value": avgfunc
          },
          {
            "name": "Improvement",
            "value": avgimprov
          }
        ]

      });

     

    // index++;


    });
    //console.log(graphs);
  
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

