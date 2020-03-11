import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { ProductBrandComponent } from './product-brand.component';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

describe('ProductBrandComponent', () => {
  let component: ProductBrandComponent;
  let fixture: ComponentFixture < ProductBrandComponent > ;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          BrowserAnimationsModule,
          FormsModule,
          ReactiveFormsModule,
          MatIconModule,
          MatSelectModule,
          MatFormFieldModule,
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          }),
        ],
        declarations: [ProductBrandComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
