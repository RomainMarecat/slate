import { Injectable } from '@angular/core';
import { ToggleState } from './toggle';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidenavService {
  private toggleSubject = new Subject < ToggleState > ();

  toggleState = this.toggleSubject.asObservable();

  constructor() {}

  open(side ?: string, view ?: string) {
    this.toggleSubject.next( < ToggleState > { open: true, side: side ? side : 'left', view: view ? view : '' });
  }

  toggle(side ?: string, view ?: string) {
    this.toggleSubject.next( < ToggleState > { open: true, side: side ? side : 'left', view: view ? view : '' });
  }
}
