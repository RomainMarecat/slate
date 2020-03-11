import { Alert } from './alert';
import { MatBottomSheetConfig } from '@angular/material/bottom-sheet';

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
