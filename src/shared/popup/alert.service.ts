import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef, MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material';
import { AlertComponent } from './snackbar/alert.component';
import { TranslateService } from '@ngx-translate/core';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { Alert } from './alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(public matSnackBar: MatSnackBar,
              public matBottomSheet: MatBottomSheet,
              private translateService: TranslateService) {
  }

  message(message: string, parameters: object = {}) {
    this.toast(message, parameters);
  }

  show(message: string, parameters: object = {}) {
    this.toast(message, parameters);
  }

  toast(message: string, parameters: object = {}) {
    if (typeof message === 'string') {
      // Subscribe on message translation
      this.translateService.get(message, parameters)
        .subscribe((translation: string) => {
          this.openAlertMessage({message: translation} as Alert, parameters);
        }, (err) => {
          this.openAlertMessage({message} as Alert, parameters);
        });
      return;
    }
    this.openAlertMessage(message, parameters);
  }

  openAlertMessage(alert: Alert,
                   customConfig: MatSnackBarConfig<Alert> = {}): MatSnackBarRef<AlertComponent> {
    const defaultConfig: MatSnackBarConfig<Alert> = {
      data: {
        title: 'alert.bottom-sheet.default.title',
        message: 'alert.bottom-sheet.default.message',
        duration: 5000,
      },
      panelClass: null,
    };

    const config: MatSnackBarConfig<Alert> = {
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

    return this.matSnackBar.openFromComponent(
      AlertComponent,
      config
    );
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
