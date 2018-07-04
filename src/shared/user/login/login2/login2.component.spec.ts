import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Login2Component } from './login2.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatTooltipModule
} from '@angular/material';
import { CommonModule } from '@angular/common';

describe('Login2Component', () => {
  let component: Login2Component;
  let fixture: ComponentFixture<Login2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatListModule,
        MatTooltipModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [Login2Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Login2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
