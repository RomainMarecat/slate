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
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { SeoModule } from '../../seo/seo.module';
import { MediaModule } from '../../media/media.module';
import { MediaService } from '../../media/media.service';
import { MockMediaService } from '../../media/mock-media.service';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { LoaderService } from '../../loader/loader.service';
import { MockLoaderService } from '../../loader/mock-loader.service';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
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
