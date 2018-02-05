import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgPipesModule } from 'ngx-pipes';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from './../../../shared/cloudinary/cloudinary.module';
import { SharedModule } from '../../../shared/shared.module';
import { ProductAttributeComponent } from './product-attribute.component';
import { environment } from './../../../environments/environment.hockey';

describe('ProductAttributeComponent', () => {
  let component: ProductAttributeComponent;
  let fixture: ComponentFixture < ProductAttributeComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          HttpClientTestingModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
            developerMode: true,
            pageTracking: {
              clearIds: true,
            },
          }),
          CloudinaryModule.forRoot({ Cloudinary: Cloudinary }, environment.cloudinary),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          }),
          SharedModule
        ],
        declarations: [ProductAttributeComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
