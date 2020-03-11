import { Injectable } from '@angular/core';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class MomentService {

  constructor() { }

  convertDateStringToNumber(date: string, format: string) {
    return moment(date, format).valueOf();
  }
}
