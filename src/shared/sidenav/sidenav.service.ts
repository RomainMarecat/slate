import { Injectable } from '@angular/core';
import { ToggleState } from './toggle';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidenavService {
  private toggleSubject = new Subject < ToggleState > ();

  toggleState = this.toggleSubject.asObservable();

  constructor() {}

  open() {
    this.toggleSubject.next( < ToggleState > { open: true });
  }

  toggle() {
    this.toggleSubject.next( < ToggleState > { open: true });
  }
}
