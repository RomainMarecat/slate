import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListComponent } from './article-list.component';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MockArticleService } from '../shared/mock-article.service';
import { ArticleService } from '../shared/article.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MatCardModule } from '@angular/material';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture < ArticleListComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          AngularFirestoreModule,
          AngularFireStorageModule,
          CommonModule,
          FlexLayoutModule,
          HttpClientTestingModule,
          MatCardModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          }),
        ],
        declarations: [ArticleListComponent, ArticleDetailComponent],
        providers: [
          { provide: ArticleService, useClass: MockArticleService }
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
