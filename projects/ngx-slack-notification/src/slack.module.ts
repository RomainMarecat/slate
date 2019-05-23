import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SlackNotificationService } from './slack-notification.service';

export const SLACK_URL_TOKEN = new InjectionToken<string>('slackUrl');

export function createNotificationFactory(httpClient: HttpClient, slackUrl: string) {
  return new SlackNotificationService(httpClient, slackUrl);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class SlackModule {

  /**
   * Initialize SlackModule
   */
  static forRoot(slackUrl: string) {
    return {
      ngModule: SlackModule,
      providers: [{
        provide: SlackNotificationService,
        useFactory: createNotificationFactory,
        deps: [HttpClient, SLACK_URL_TOKEN]
      },
        {provide: SLACK_URL_TOKEN, useValue: slackUrl},
      ]
    };
  }
}
