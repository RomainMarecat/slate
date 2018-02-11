import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule, MatInputModule, MatFormFieldModule, MatSlideToggleModule } from '@angular/material';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { ProductBestScoreComponent } from './product-best-score.component';

describe('ProductBestScoreComponent', () => {
  let component: ProductBestScoreComponent;
  let fixture: ComponentFixture < ProductBestScoreComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          BrowserAnimationsModule,
          FormsModule,
          ReactiveFormsModule,
          MatIconModule,
          MatSlideToggleModule,
          MatFormFieldModule,
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          }),
        ],
        declarations: [ProductBestScoreComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBestScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
