import { Injectable } from '@angular/core';

@Injectable()
export class ObjectService {

  constructor() {}

  /**
   * Return a boolean of empty state object
   * @param obj
   * @returns {boolean}
   */
  isEmpty(obj): boolean {
    return Object.keys(obj).length === 0;
  }

}
