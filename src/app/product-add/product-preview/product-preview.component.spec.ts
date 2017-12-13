import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
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
import { NgStringPipesModule } from 'angular-pipes';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../../core/shared/cloudinary/cloudinary.module';
import { CloudinaryConfig } from '../../../core/shared/cloudinary/cloudinary-config';
import { ProductActionComponent } from './../../product-item/product-action/product-action.component';
import { MockProductService } from '../../../core/shared/product/mock-product.service';
import { ProductService } from '../../../core/shared/product/product.service';
import { ImageComponent } from '../../../core/shared/cloudinary/image/image.component';
import { ProductPreviewComponent } from './product-preview.component';
import { DateService } from '../../../core/shared/util/date.service';
import { I18nService } from '../../../core/shared/i18n/i18n.service';

describe('ProductPreviewComponent', () => {
  let component: ProductPreviewComponent;
  let fixture: ComponentFixture < ProductPreviewComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          RouterTestingModule,
          BrowserModule,
          HttpClientModule,
          RouterTestingModule,
          NgStringPipesModule,
          BrowserAnimationsModule,
          MatCardModule,
          MatIconModule,
          MatButtonModule,
          MatGridListModule,
          MatInputModule,
          MatCheckboxModule,
          MatListModule,
          NgStringPipesModule,
          Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
            developerMode: true,
            pageTracking: {
              clearIds: true,
            },
          }),
          CloudinaryModule.forRoot({ Cloudinary: Cloudinary }, CloudinaryConfig),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          })
        ],
        declarations: [ProductPreviewComponent, ImageComponent],
        providers: [
          { provide: DateService, useClass: DateService },
          I18nService
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
