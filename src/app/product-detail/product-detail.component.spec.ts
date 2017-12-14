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
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { NgStringPipesModule } from 'angular-pipes';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../core/shared/cloudinary/cloudinary.module';
import { CloudinaryConfig } from '../../core/shared/cloudinary/cloudinary-config';
import { ProductActionComponent } from './../product-item/product-action/product-action.component';
import { MockProductService } from '../../core/shared/product/mock-product.service';
import { ProductService } from '../../core/shared/product/product.service';
import { ProductDetailComponent } from './product-detail.component';
import { MediaService } from '../../core/shared/media/media.service';
import { MockMediaService } from '../../core/shared/media/mock-media.service';
import { LoaderService } from '../../core/shared/loader/loader.service';
import { MockLoaderService } from '../../core/shared/loader/mock-loader.service';
import { environment } from './../../environments/environment.monpullmoche';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture < ProductDetailComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          RouterTestingModule,
          BrowserModule,
          HttpClientModule,
          BrowserAnimationsModule,
          MatCardModule,
          MatIconModule,
          MatButtonModule,
          MatGridListModule,
          MatInputModule,
          MatCheckboxModule,
          NgStringPipesModule,
          MatListModule,
          CloudinaryModule.forRoot({ Cloudinary: Cloudinary }, environment.cloudinary),
          Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
            developerMode: true,
            pageTracking: {
              clearIds: true,
            },
          }),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          })
        ],
        declarations: [ProductDetailComponent, ProductActionComponent],
        providers: [
          { provide: ProductService, useClass: MockProductService },
          { provide: MediaService, useClass: MockMediaService },
          { provide: LoaderService, useClass: MockLoaderService },
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
