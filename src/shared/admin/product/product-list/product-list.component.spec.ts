import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductListComponent } from './product-list.component';
import { SharedModule } from '../../../shared.module';
import { MediaService } from '../../../media/media.service';
import { MockMediaService } from '../../../media/mock-media.service';
import { MenuService } from '../../../menu/menu.service';
import { CloudinaryModule } from '../../../media/cloudinary/cloudinary.module';
import { MockCloudinaryService } from '../../../media/cloudinary/mock-cloudinary.service';
import { CloudinaryUploadService } from '../../../media/cloudinary/cloudinary-upload.service';
import { MockCloudinaryUploadService } from '../../../media/cloudinary/mock-cloudinary-upload.service';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { MediaModule } from '../../../media/media.module';
import { environment } from '../../../../app-hockey/environments/environment';
import { MockProductService } from '../../../product/shared/mock-product.service';
import { ProductService } from '../../../product/shared/product.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        CloudinaryModule.forRoot({Cloudinary: MockCloudinaryService}, environment.cloudinary),
        MediaModule,
        SharedModule,
      ],
      declarations: [ ProductListComponent, ProductFilterComponent ],
      providers: [
        MenuService,
        {provide: ProductService, useClass: MockProductService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: CloudinaryUploadService, useClass: MockCloudinaryUploadService},
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
