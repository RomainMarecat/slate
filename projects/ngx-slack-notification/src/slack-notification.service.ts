import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SlackMessage } from './slack-message';

@Injectable({
  providedIn: 'root'
})
export class SlackNotificationService {

  constructor(private http: HttpClient,
              @Inject('slackUrl') private slackUrl: string) {
  }

  /**
   * Send notification to slack
   *
   * you could subscribe directly on this Observable
   *
   * returns 200 with message "ok" if success
   * throw HttpErrorResponse 400
   */
  sendNotification(message: string): Observable<string> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.http
      .post(
        this.slackUrl,
        message,
        {
          headers: headers,
          responseType: 'text'
        }
      );
  }

  /**
   * Main function to send notification to slack
   */
  notify(slackMessage: SlackMessage): void {
    const message = `payload=${JSON.stringify(slackMessage)}`;

    this.sendNotification(message).subscribe();
  }
}
