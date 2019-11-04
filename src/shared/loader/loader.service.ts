import { Injectable } from '@angular/core';
import { LoaderState } from './loader';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
  private loaderSubject = new Subject < LoaderState > ();
  loaderState = this.loaderSubject.asObservable();
  constructor() {}

  /**
   * Send a show action
   */
  show() {
    this.loaderSubject.next( { show: true } as LoaderState);
  }

  /**
   * Send a hide action
   */
  hide() {
    this.loaderSubject.next( { show: false } as LoaderState);
  }
}
