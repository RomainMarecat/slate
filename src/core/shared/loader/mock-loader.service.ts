import { LoaderState } from './loader';
import { Subject } from 'rxjs/Subject';

export class MockLoaderService {
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
