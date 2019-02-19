import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
} from '@angular/material';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductItemComponent } from './product-item.component';
import { ProductActionComponent } from '../product-action/product-action.component';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../media/cloudinary/cloudinary.module';
import { DateService } from '../../util/date.service';
import { I18nService } from '../../i18n/i18n.service';
import { MediaModule } from '../../media/media.module';
import { environment } from '../../../app-store/environments/environment';
import { LoaderModule } from '../../loader/loader.module';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { LoaderService } from '../../loader/loader.service';
import { MockLoaderService } from '../../loader/mock-loader.service';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        BrowserModule,
        HttpClientModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        NgPipesModule,
        LoaderModule,
        LocalizeRouterModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatCardModule,
        Angulartics2Module.forRoot({
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        CloudinaryModule.forRoot({Cloudinary: Cloudinary}, environment.cloudinary),
        MediaModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [ProductItemComponent, ProductActionComponent],
      providers: [
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: DateService, useClass: DateService},
        I18nService
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
