import { LoaderState } from './loader';
import { Subject } from 'rxjs';

export class MockLoaderService {
  private loaderSubject = new Subject < LoaderState > ();
  loaderState = this.loaderSubject.asObservable();

  constructor() {}

  show() {
    this.loaderSubject.next( { show: true } as LoaderState);
  }
  hide() {
    this.loaderSubject.next( { show: false } as LoaderState);
  }
}
