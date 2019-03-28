import { inject, TestBed } from '@angular/core/testing';

import { MatBottomSheetModule, MatSnackBarModule } from '@angular/material';
import { AlertService } from './alert.service';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { I18nService } from '../i18n/i18n.service';

describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        MatBottomSheetModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      providers: [
        AlertService,
        I18nService
      ]
    });
  });

  it('should be created', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));
});
