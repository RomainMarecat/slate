import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductImageOrderComponent } from './product-image-order.component';
import { CloudinaryModule } from '../../../media/cloudinary/cloudinary.module';
import { MockCloudinaryService } from '../../../media/cloudinary/mock-cloudinary.service';
import { SharedModule } from '../../../shared.module';
import { environment } from '../../../../app-hockey/environments/environment';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';

describe('ProductImageOrderComponent', () => {
  let component: ProductImageOrderComponent;
  let fixture: ComponentFixture < ProductImageOrderComponent > ;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          BrowserModule,
          HttpClientModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          NgxDatatableModule,
          CloudinaryModule.forRoot({ Cloudinary: MockCloudinaryService }, environment.cloudinary),
          SharedModule,
        ],
        declarations: [ProductImageOrderComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
