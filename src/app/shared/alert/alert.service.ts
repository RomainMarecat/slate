import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AlertComponent } from './alert.component';

@Injectable()
export class AlertService {
  constructor(public snackBar: MatSnackBar) {}

  toast(message: string, state: string = 'info') {
    let toastRef = this.snackBar.openFromComponent(AlertComponent, {
      data: message,
      extraClasses: ['snackbar', state],
      duration: 8000
    });
  }
}
