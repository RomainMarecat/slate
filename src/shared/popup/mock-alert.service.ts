import { MatBottomSheetConfig } from '@angular/material';
import { Alert } from './alert';

export class MockAlertService {
  toast(message: string, state: string = 'info') {
    const toastRef = {};
  }

  show() {
  }

  /**
   * Ouvre une popup en bas de page pour afficher une alerte personnalisée
   */
  openAlertMessage(alert: Alert,
                   customConfig: MatBottomSheetConfig<Alert> = {}) {
  }
}
