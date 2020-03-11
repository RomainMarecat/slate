import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchComponent } from './product-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MockProductService } from '../shared/mock-product.service';
import { ProductService } from '../shared/product.service';
import { MockCategoryService } from '../../category/mock-category.service';
import { CategoryService } from '../../category/category.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalizeRouterService } from 'localize-router';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        ReactiveFormsModule
      ],
      declarations: [ProductSearchComponent],
      providers: [
        {provide: ProductService, useClass: MockProductService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
