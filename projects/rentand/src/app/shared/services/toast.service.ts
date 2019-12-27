import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from '../interfaces/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private emitChangeSource = new Subject<Toast>();

  toastEmitted = this.emitChangeSource.asObservable();

  emitToast(toast: Toast) {
    this.emitChangeSource.next(toast);
  }
}
