import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
} from '@angular/material';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { NgPipesModule } from 'ngx-pipes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './product-list.component';
import { ProductItemCardComponent } from '../product-item-card/product-item-card.component';
import { ProductActionComponent } from '../product-action/product-action.component';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../media/cloudinary/cloudinary.module';
import { ProductService } from '../shared/product.service';
import { MockProductService } from '../shared/mock-product.service';
import { MockUserService } from '../../user/shared/mock-user.service';
import { UserService } from '../../user/shared/user.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { AlertService } from '../../popup/alert.service';
import { LoaderService } from '../../loader/loader.service';
import { MockLoaderService } from '../../loader/mock-loader.service';
import { ScoreService } from '../../score/score.service';
import { DateService } from '../../util/date.service';
import { MockScoreService } from '../../score/mock-score.service';
import { I18nService } from '../../i18n/i18n.service';
import { MediaModule } from '../../media/media.module';
import { environment } from '../../../app-store/environments/environment';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { LoaderModule } from '../../loader/loader.module';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { SeoModule } from '../../seo/seo.module';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        CloudinaryModule.forRoot({Cloudinary: Cloudinary}, environment.cloudinary),
        LoaderModule,
        LocalizeRouterModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatInputModule,
        MatCheckboxModule,
        NgPipesModule,
        MatListModule,
        Angulartics2Module.forRoot({
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        SeoModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        MediaModule
      ],
      declarations: [
        ProductListComponent,
        ProductItemCardComponent,
        ProductActionComponent
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: ProductService, useClass: MockProductService},
        {provide: UserService, useClass: MockUserService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: ScoreService, useClass: MockScoreService},
        {provide: DateService, useClass: DateService},
        I18nService
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
