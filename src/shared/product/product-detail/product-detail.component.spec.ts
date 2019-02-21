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
  MatListModule
} from '@angular/material';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { NgPipesModule } from 'ngx-pipes';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../media/cloudinary/cloudinary.module';
import { ProductActionComponent } from '../product-action/product-action.component';
import { MockProductService } from '../shared/mock-product.service';
import { ProductService } from '../shared/product.service';
import { ProductDetailComponent } from './product-detail.component';
import { MediaService } from '../../media/media.service';
import { MockMediaService } from '../../media/mock-media.service';
import { LoaderService } from '../../loader/loader.service';
import { MockLoaderService } from '../../loader/mock-loader.service';
import { MediaModule } from '../../media/media.module';
import { environment } from '../../../app-store/environments/environment';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { SeoModule } from '../../seo/seo.module';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        Angulartics2Module.forRoot({
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        CloudinaryModule.forRoot({Cloudinary: Cloudinary}, environment.cloudinary),
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatInputModule,
        MatCheckboxModule,
        NgPipesModule,
        MatListModule,
        MediaModule,
        RouterTestingModule,
        SeoModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [ProductDetailComponent, ProductActionComponent],
      providers: [
        {provide: ProductService, useClass: MockProductService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: LoaderService, useClass: MockLoaderService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
