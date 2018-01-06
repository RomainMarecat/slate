import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class NotificationService {

  /**
   * constructor
   * @param {Http}     private http
   * @param {Injector} private injector
   */
  constructor(private http: HttpClient, @Inject('slackUrl') private slackUrl: string) {}

  /**
   * Send notification to slack
   * @param  object     slackObject
   * @return Observable<string>
   */
  notifySlack(slackObject: object): Observable < any > {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    // @otodo Http Interceptor for
    // {
    //  headers: headers
    // }
    return this.http
      .post(
        this.slackUrl,
        `payload=${JSON.stringify(slackObject)}`
      );
  }
}
