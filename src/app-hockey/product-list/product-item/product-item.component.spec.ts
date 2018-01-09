import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemComponent } from './product-item.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule, MatIconModule } from '@angular/material';
import { NgPipesModule } from 'ngx-pipes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { CloudinaryModule } from '../../../shared/cloudinary/cloudinary.module';
import { Cloudinary } from 'cloudinary-core';
import { environment } from '../../../environments/environment.hockey';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../../../shared/product/product.service';
import { MockProductService } from '../../../shared/product/mock-product.service';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture < ProductItemComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          RouterTestingModule,
          BrowserModule,
          HttpClientModule,
          MatIconModule,
          MatCardModule,
          NgPipesModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          MatCardModule,
          Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
            developerMode: true,
            pageTracking: {
              clearIds: true,
            },
          }),
          CloudinaryModule.forRoot({ Cloudinary: Cloudinary }, environment.cloudinary),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          })
        ],
        declarations: [ProductItemComponent],
        providers: [
          { provide: ProductService, useClass: MockProductService },
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
