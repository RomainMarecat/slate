import { Injectable } from '@angular/core';
import { LoaderState } from './loader';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderService {
  private loaderSubject = new Subject < LoaderState > ();
  loaderState = this.loaderSubject.asObservable();
  constructor() {}

  /**
   * Send a show action
   */
  show() {
    this.loaderSubject.next( < LoaderState > { show: true });
  }

  /**
   * Send a hide action
   */
  hide() {
    this.loaderSubject.next( < LoaderState > { show: false });
  }
}
