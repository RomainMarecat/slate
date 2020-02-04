import { Pipe, PipeTransform } from '@angular/core';
import * as _moment from 'moment';

const moment = _moment;

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: Date): string {
    return moment().diff(moment(value), 'years').toString(10);
  }
}
