import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailComponent } from './article-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material';
import { PipeModule } from '../../pipe/pipe.module';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { SeoModule } from '../../seo/seo.module';
import { MediaModule } from '../../media/media.module';
import { MediaService } from '../../media/media.service';
import { MockMediaService } from '../../media/mock-media.service';
import { ArticleService } from '../shared/article.service';
import { MockArticleService } from '../shared/mock-article.service';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;

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
        SeoModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [ArticleDetailComponent],
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
    fixture = TestBed.createComponent(ArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
