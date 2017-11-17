import { Injectable, Injector } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { SlackUrlToken } from './slack.module';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificationService {

  private slackUrlToken: string;

  /**
   * constructor
   * @param {Http}     private http
   * @param {Injector} private injector
   */
  constructor(private http: Http, private injector: Injector) {
    this.slackUrlToken = this.injector.get(SlackUrlToken);
  }

  /**
   * Send notification to slack
   * @param  object     slackObject
   * @return Observable<string>
   */
  notifySlack(slackObject: object): Observable < string > {
    const header = new Headers();
    header.append('Content-Type', 'application/json');

    return this.http
      .post(
        this.slackUrlToken,
        slackObject, {
          headers: header
        })
      .map((response: Response) => {
        console.log(response);
        return response.text();
      });
  }
}
