import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockSlackNotificationService } from './mock-slack-notification.service';
import { SlackNotificationService } from './slack-notification.service';

describe('SlackNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [{
        provide: SlackNotificationService,
        useClass: MockSlackNotificationService
      }]
    });
  });

  it('should be created', inject([SlackNotificationService], (service: SlackNotificationService) => {
    expect(service).toBeTruthy();
  }));


  it('should send message and call send Message', inject([SlackNotificationService], (service: SlackNotificationService) => {
    service.notify({text: 'Hello World'});

    expect(service).toBeTruthy();
  }));


  it('should send notification with http', inject([SlackNotificationService], (service: SlackNotificationService) => {
    service.sendNotification('test').subscribe();

    expect(service).toBeTruthy();
  }));
});
