import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MatSnackBar } from '@angular/material';
import { AlertComponent } from './snackbar/alert.component';
import { TranslateService } from '@ngx-translate/core';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { Alert } from './alert';

@Injectable()
export class AlertService {
  constructor(public snackBar: MatSnackBar,
              public matBottomSheet: MatBottomSheet,
              private translateService: TranslateService) {
  }

  message(message: string, parameters: Object = {}) {
    this.toast(message, parameters);
  }

  show(message: string, parameters: Object = {}) {
    this.toast(message, parameters);
  }

  toast(message: string, parameters: Object = {}) {
    if (typeof message === 'string') {
      // Subscribe on message translation
      this.translateService.get(message, parameters)
        .subscribe((translation: string) => {
          this.openAlertMessage(translation, parameters);
        }, (err) => {
          this.openAlertMessage(message, parameters);
        });
      return;
    }
    this.openAlertMessage(message, parameters);
  }

  openAlertMessage(message: string, parameters: Object) {
    // Open Alert Component with a message
    const toastRef = this.snackBar.openFromComponent(AlertComponent, {
      data: message,
      // Add extra class to define custom css or background color
      panelClass: ['snackbar'],
      // Timeout duration in ms
      duration: 8000
    });
  }

  /**
   * Display bottom sheet message
   */
  bottomSheetMessage(title: string, message: string) {
    setTimeout(() => {
      const matBottomSheetRef: MatBottomSheetRef = this.matBottomSheet.open(BottomSheetComponent, {
        data: {
          title: title,
          message: message,
        },
        hasBackdrop: false
      });
    }, 500);
  }
}
