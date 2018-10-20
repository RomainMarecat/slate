import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NotificationService } from './notification.service';

export const SlackUrlToken = new InjectionToken<string>('slackUrl');

export function createNotificationFactory(httpClient: HttpClient, slackUrl: string) {
  return new NotificationService(httpClient, slackUrl);
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
  static forRoot(slackUrl: InjectionToken<string>) {
    return {
      ngModule: SlackModule,
      providers: [{
        provide: NotificationService,
        useFactory: createNotificationFactory,
        deps: [HttpClient, SlackUrlToken]
      },
        {provide: SlackUrlToken, useValue: slackUrl},

      ]
    };
  }
}
