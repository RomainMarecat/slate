import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18nService } from './i18n/i18n.service';
import { SlackModule } from './slack/slack.module';
import { environment } from './../../environments/environment';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    SlackModule.initializeApp(environment.slackToken),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    TranslateModule,
    SlackModule
  ],
  declarations: [],
  providers: [
    I18nService
  ]
})
export class SharedModule {}
