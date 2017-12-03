import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductListComponent } from './product-list.component';
import { ProductService } from './../../shared/product/product.service';
import { MockProductService } from './../../shared/product/mock-product.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture < ProductListComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          BrowserModule,
          HttpModule,
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
          MatToolbarModule
        ],
        declarations: [ProductListComponent],
        providers: [
          { provide: ProductService, useClass: MockProductService },

        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
