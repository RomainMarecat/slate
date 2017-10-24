import { Injectable } from '@angular/core';
import { LoaderState } from './loader';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderService {
  private loaderSubject = new Subject < LoaderState > ();
  loaderState = this.loaderSubject.asObservable();
  constructor() {}
  show() {
    this.loaderSubject.next( < LoaderState > { show: true });
  }
  hide() {
    this.loaderSubject.next( < LoaderState > { show: false });
  }
}
