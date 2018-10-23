import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { CommentListComponent } from './comment-list.component';
import { CommentEditComponent } from './../comment-edit/comment-edit.component';
import { CommentDetailComponent } from './../comment-detail/comment-detail.component';
import { CommentAddComponent } from './../comment-add/comment-add.component';
import { CommentService } from './../comment.service';
import { MockCommentService } from './../mock-comment.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { configureTestSuite } from '../../unit-test/configure-test-suite';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;

  configureTestSuite();

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
        Angulartics2Module.forRoot({
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [CommentListComponent, CommentEditComponent, CommentAddComponent, CommentDetailComponent],
      providers: [
        {provide: CommentService, useClass: MockCommentService}
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
