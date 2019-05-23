import { Observable, of } from 'rxjs';

export class MockSlackNotificationService {
  notify(): void {
  }

  sendNotification(): Observable<string> {
    return of('ok');
  }
}
