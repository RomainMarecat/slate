import {Inject, Injectable, Injector} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificationService {

  /**
   * constructor
   * @param {Http}     private http
   * @param {Injector} private injector
   */
  constructor(private http: Http, @Inject('slackUrl') private slackUrl: string) {}

  /**
   * Send notification to slack
   * @param  object     slackObject
   * @return Observable<string>
   */
  notifySlack(slackObject: object): Observable < string > {
    const header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.http
      .post(
        this.slackUrl,
        `payload=${JSON.stringify(slackObject)}`, {
          headers: header
        })
      .map((response: Response) => {
        return response.json();
      });
  }
}
