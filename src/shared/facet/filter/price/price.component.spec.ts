import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { PriceComponent } from './price.component';

describe('PriceComponent', () => {
  let component: PriceComponent;
  let fixture: ComponentFixture < PriceComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          BrowserAnimationsModule,
          CommonModule,
          FormsModule,
          ReactiveFormsModule,
          MatFormFieldModule,
          MatIconModule,
          MatInputModule,
          MatButtonModule,
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          }),
        ],
        declarations: [PriceComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
