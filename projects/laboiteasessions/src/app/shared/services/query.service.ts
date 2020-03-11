import { Injectable } from '@angular/core';

export interface FilterQuery {
  column: string;
  operator: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  static buildQueryParams(filters: FilterQuery[]): string {
    return filters.reduce((acc, next, index) => {
      if (index === 0) {
        return `${acc}${next.column}[value]=${next.value}&${next.column}[operator]=${next.operator}`;
      }
      return `${acc}&${next.column}[value]=${next.value}&${next.column}[operator]=${next.operator}`;
    }, '');
  }
}
