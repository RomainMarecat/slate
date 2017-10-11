import { Injectable } from '@angular/core';

@Injectable()
export class ObjectService {

  constructor() {}

  isEmpty(obj): boolean {
    return Object.keys(obj).length === 0;
  }

}
