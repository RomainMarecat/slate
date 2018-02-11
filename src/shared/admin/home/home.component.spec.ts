import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductComponent } from '../../../shared/admin/product/product.component';
import { ProductListComponent } from '../../../shared/admin/product/product-list/product-list.component';
import { ProductService } from '../../../shared/admin/shared/product/product.service';
import { MockProductService } from '../../../shared/admin/shared/product/mock-product.service';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared.module';
import { ProductFilterComponent } from './../product/product-filter/product-filter.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture < HomeComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          RouterTestingModule,
          BrowserModule,
          HttpClientModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          NgxDatatableModule,
          MatCardModule,
          MatIconModule,
          MatButtonModule,
          MatGridListModule,
          MatInputModule,
          MatCheckboxModule,
          MatListModule,
          MatToolbarModule,
          SharedModule
        ],
        declarations: [HomeComponent, ProductComponent, ProductListComponent, ProductFilterComponent],
        providers: [
          { provide: ProductService, useClass: MockProductService },
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
