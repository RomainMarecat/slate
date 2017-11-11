import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AlertComponent } from './alert.component';

@Injectable()
export class AlertService {
  constructor(public snackBar: MatSnackBar) {}

  toast(message: string, state: string = 'info') {
    // Open Alert Component with a message
    const toastRef = this.snackBar.openFromComponent(AlertComponent, {
      data: message,
      // Add extra classes to define custom css or background color
      extraClasses: ['snackbar', state],
      // Timeout duration in ms
      duration: 8000
    });
  }
}
