import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleItemComponent } from './article-item.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material';
import { PipeModule } from '../../pipe/pipe.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MediaModule } from '../../media/media.module';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { AlertService } from '../../popup/alert.service';
import { MediaService } from '../../media/media.service';
import { MockMediaService } from '../../media/mock-media.service';
import { ArticleService } from '../shared/article.service';
import { MockArticleService } from '../shared/mock-article.service';
import { configureTestSuite } from '../../unit-test/configure-test-suite';

describe('ArticleItemComponent', () => {
  let component: ArticleItemComponent;
  let fixture: ComponentFixture<ArticleItemComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireStorageModule,
        FlexLayoutModule,
        MatCardModule,
        PipeModule,
        HttpClientTestingModule,
        MediaModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        LocalizeRouterModule,
        PipeModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [ArticleItemComponent],
      providers: [
        {provide: MediaService, useClass: MockMediaService},
        {provide: ArticleService, useClass: MockArticleService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
