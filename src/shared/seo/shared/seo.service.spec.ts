import { TestBed } from '@angular/core/testing';

import { SeoService } from './seo.service';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../menu/menu.service';
import { MenuModule } from '../../menu/menu.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

describe('SeoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CommonModule,
      MenuModule,
      TranslateModule.forRoot({
        loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
      }),
    ],
    providers: [
      MenuService
    ]
  }));

  it('should be created', () => {
    const service: SeoService = TestBed.get(SeoService);
    expect(service).toBeTruthy();
  });
});
