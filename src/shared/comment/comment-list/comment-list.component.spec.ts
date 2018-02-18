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
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';
import { CommentService } from './../comment.service';

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
        declarations: [CommentListComponent],
        providers: [
          CommentService
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
