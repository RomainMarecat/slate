import { Injectable } from '@angular/core';

@Injectable()
export class ObjectService {

  constructor() {
  }

  /**
   * Return a boolean of empty state object
   * @param obj
   * @returns {boolean}
   */
  isEmpty(obj): boolean {
    return Object.keys(obj).length === 0;
  }

  /**
   *
   * @param {Array<any>} items
   * @param {string} column
   * @returns {Array<any>}
   */
  bubbleSort(items: Array<any>, column?: string): Array<any> {
    const length = items.length;
    for (let i = 0; i < length; i++) {
      // Number of passes
      for (let j = 0; j < (length - i - 1); j++) {
        // Notice that j < (length - i)
        // Compare the adjacent positions
        if (items[ j ][ column ] > items[ j + 1 ][ column ]) {
          // Swap the numbers
          const tmp = items[ j ];
          // Temporary variable to hold the current object
          items[ j ] = items[ j + 1 ];
          // Replace current object with adjacent object
          items[ j + 1 ] = tmp;
          // Replace adjacent object with current object
        }
      }
    }

    return items;
  }

}
