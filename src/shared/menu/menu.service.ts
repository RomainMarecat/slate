import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MenuService {
  private menuSubject = new Subject < string > ();
  menuState = this.menuSubject.asObservable();

  constructor() {}

  nextTitle(title ?: string) {
    this.menuSubject.next( < string > title);
  }
}
