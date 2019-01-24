import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListComponent } from './article-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MockArticleService } from '../shared/mock-article.service';
import { ArticleService } from '../shared/article.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatCardModule } from '@angular/material';
import { PipeModule } from '../../pipe/pipe.module';
import { AlertService } from 'shared/popup/alert.service';
import { MockAlertService } from 'shared/popup/mock-alert.service';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { MockLocalizeRouterService } from 'shared/router/mock-localize-router.service';
import { MediaModule } from 'shared/media/media.module';
import { MediaService } from 'shared/media/media.service';
import { MockMediaService } from 'shared/media/mock-media.service';
import { LoaderService } from 'shared/loader/loader.service';
import { MockLoaderService } from 'shared/loader/mock-loader.service';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { SeoModule } from '../../seo/seo.module';
import { ArticleItemComponent } from '../article-item/article-item.component';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireStorageModule,
        CommonModule,
        FlexLayoutModule,
        HttpClientTestingModule,
        MatCardModule,
        MediaModule,
        SeoModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        LocalizeRouterModule,
        PipeModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [
        ArticleListComponent,
        ArticleItemComponent
      ],
      providers: [
        {provide: MediaService, useClass: MockMediaService},
        {provide: ArticleService, useClass: MockArticleService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
