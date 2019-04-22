import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef, MatSnackBar } from '@angular/material';
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
   * Ouvre une popup en bas de page pour afficher une alerte personnalisée
   */
  openBottomSheetMessage(alert: Alert,
                         customConfig: MatBottomSheetConfig<Alert> = {}): MatBottomSheetRef {
    const defaultConfig: MatBottomSheetConfig<Alert> = {
      data: {
        title: 'alert.bottom-sheet.default.title',
        message: 'alert.bottom-sheet.default.message',
        duration: 5000,
      },
      panelClass: null,
      hasBackdrop: false,
      closeOnNavigation: true
    };

    const config: MatBottomSheetConfig<Alert> = {
      ...defaultConfig,
      ...customConfig,
      ...{
        data: {
          title: alert.title,
          message: alert.message,
          duration: alert.duration ? alert.duration : defaultConfig.data.duration,
        }
      }
    };

    return this.matBottomSheet.open(
      BottomSheetComponent,
      config
    );
  }
}
