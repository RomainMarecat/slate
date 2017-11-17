import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { NotificationService } from './notification.service';

export const SlackUrlToken = new InjectionToken < string > ('SlackUrlToken');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
  ],
  declarations: []
})
export class SlackModule {

  /**
   * Initialize SlackModule
   *
   * @param slackUrl Slack Webhook URL or any URL that accept POST and object { text: '...' }
   * @returns {{ngModule: SlackModule, providers: [{provide: InjectionToken<string>, useValue: string}]}}
   */
  static initializeApp(slackUrl: string) {
    return {
      ngModule: SlackModule,
      providers: [
        { provide: SlackUrlToken, useValue: slackUrl }
      ]
    };
  }
}
