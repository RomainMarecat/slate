import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceNotificationComponent } from './preference-notification.component';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { MaterialModule } from '../../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PreferenceNotificationComponent', () => {
  let component: PreferenceNotificationComponent;
  let fixture: ComponentFixture<PreferenceNotificationComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreferenceNotificationComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
