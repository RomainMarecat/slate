import { Alert } from './alert';
import { MatBottomSheetConfig } from '@angular/material';

export class MockAlertService {
  toast(message: string, state: string = 'info') {
    const toastRef = {};
  }

  show() {
  }

  /**
   * Ouvre une popup en bas de page pour afficher une alerte personnalisée
   */
  openBottomSheetMessage(alert: Alert,
                         customConfig: MatBottomSheetConfig<Alert> = {}) {
  }
}
