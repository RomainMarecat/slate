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
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './../shared/product/product.service';
import { MockProductService } from './../shared/product/mock-product.service';
import { SharedModule } from '../../shared.module';
import { MediaService } from '../../media/media.service';
import { MenuService } from '../../menu/menu.service';
import { MockMediaService } from '../../media/mock-media.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture < ProductComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          BrowserModule,
          HttpClientModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          NgxDatatableModule,
          SharedModule
        ],
        declarations: [ProductComponent],
        providers: [
          { provide: MenuService, useClass: MenuService },
          { provide: ProductService, useClass: MockProductService },
          { provide: MediaService, useClass: MockMediaService },
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
