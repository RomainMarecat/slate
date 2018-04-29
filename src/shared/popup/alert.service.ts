import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AlertComponent } from './snackbar/alert.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AlertService {
  constructor(public snackBar: MatSnackBar, private translateService: TranslateService) {
  }

  message(message: string, state: string = 'info') {
    this.toast(message, state);
  }

  show(message: string, state: string = 'info') {
    this.toast(message, state);
  }

  toast(message: string, state: string = 'info') {
    // Subscribe on message translation
    this.translateService.get(message).subscribe((translation: string) => {
      // Open Alert Component with a message
      const toastRef = this.snackBar.openFromComponent(AlertComponent, {
        data: translation,
        // Add extra classes to define custom css or background color
        extraClasses: [ 'snackbar', state ],
        // Timeout duration in ms
        duration: 8000
      });
    });
  }
}
