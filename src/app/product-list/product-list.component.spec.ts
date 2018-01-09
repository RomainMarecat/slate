import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { NgPipesModule } from 'ngx-pipes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './product-list.component';
import { ProductItemComponent } from './../product-item/product-item.component';
import { ProductActionComponent } from './../product-item/product-action/product-action.component';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../shared/cloudinary/cloudinary.module';
import { CloudinaryConfig } from '../../shared/cloudinary/cloudinary-config';
import { ProductService } from '../../shared/product/product.service';
import { MockProductService } from '../../shared/product/mock-product.service';
import { MockUserService } from '../../shared/user/mock-user.service';
import { UserService } from '../../shared/user/user.service';
import { MockAlertService } from '../../shared/popup/mock-alert.service';
import { AlertService } from '../../shared/popup/alert.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { MockLoaderService } from '../../shared/loader/mock-loader.service';
import { ScoreService } from '../../shared/score/score.service';
import { DateService } from '../../shared/util/date.service';
import { MockScoreService } from '../../shared/score/mock-score.service';
import { I18nService } from '../../shared/i18n/i18n.service';
import { environment } from './../../environments/environment.monpullmoche';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture < ProductListComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          BrowserModule,
          HttpClientModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          MatCardModule,
          MatIconModule,
          MatButtonModule,
          MatGridListModule,
          MatInputModule,
          MatCheckboxModule,
          NgPipesModule,
          MatListModule,
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
        declarations: [ProductListComponent, ProductItemComponent, ProductActionComponent],
        providers: [
          { provide: ProductService, useClass: MockProductService },
          { provide: UserService, useClass: MockUserService },
          { provide: AlertService, useClass: MockAlertService },
          { provide: LoaderService, useClass: MockLoaderService },
          { provide: ScoreService, useClass: MockScoreService },
          { provide: DateService, useClass: DateService },
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
