import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgPipesModule } from 'ngx-pipes';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { CommentListComponent } from './comment-list.component';
import { CommentEditComponent } from './../comment-edit/comment-edit.component';
import { CommentDetailComponent } from './../comment-detail/comment-detail.component';
import { CommentAddComponent } from './../comment-add/comment-add.component';
import { CommentService } from './../comment.service';
import { MockCommentService } from './../mock-comment.service';
import { NgModule, InjectionToken } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatLineModule,
  MatMenuModule,
  MatCommonModule,
  MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture < CommentListComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          MatButtonModule,
          MatIconModule,
          MatCardModule,
          HttpClientTestingModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          FlexLayoutModule,
          FormsModule,
          MatInputModule,
          MatFormFieldModule,
          ReactiveFormsModule,
          TranslateModule,
          Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
            developerMode: true,
            pageTracking: {
              clearIds: true,
            },
          }),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          }),
        ],
        declarations: [CommentListComponent, CommentEditComponent, CommentAddComponent, CommentDetailComponent],
        providers: [
          { provide: CommentService, useClass: MockCommentService }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
