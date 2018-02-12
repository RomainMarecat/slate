import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { ProductService } from './../../shared/product/product.service';
import { MockProductService } from './../../shared/product/mock-product.service';
import { SharedModule } from '../../../shared.module';
import { MediaService } from '../../../media/media.service';
import { MockMediaService } from '../../../media/mock-media.service';
import { MenuService } from '../../../menu/menu.service';
import { CloudinaryModule } from './../../../cloudinary/cloudinary.module';
import { CloudinaryUploadService } from './../../../cloudinary/cloudinary-upload.service';
import { MockCloudinaryUploadService } from './../../../cloudinary/mock-cloudinary-upload.service';
import { Cloudinary } from './../../../cloudinary/cloudinary.service';
import { MockCloudinaryService } from './../../../cloudinary/mock-cloudinary.service';
import { environment } from '../../../../environments/environment.hockey';

import { ProductFilterComponent } from './product-filter.component';

describe('ProductFilterComponent', () => {
  let component: ProductFilterComponent;
  let fixture: ComponentFixture < ProductFilterComponent > ;

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
        declarations: [ProductFilterComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});