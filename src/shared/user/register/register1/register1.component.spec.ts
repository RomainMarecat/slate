import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register1Component } from './register1.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

describe('Register1Component', () => {
  let component: Register1Component;
  let fixture: ComponentFixture<Register1Component>;

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
      declarations: [ Register1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
