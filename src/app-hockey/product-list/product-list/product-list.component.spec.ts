import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
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
import { NgStringPipesModule } from 'angular-pipes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './product-list.component';
import { ProductItemComponent } from './../product-item/product-item.component';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from './../../../core/shared/cloudinary/cloudinary.module';
import { CloudinaryConfig } from './../../../core/shared/cloudinary/cloudinary-config';
import { ProductService } from './../../../core/shared/product/product.service';
import { MockProductService } from './../../../core/shared/product/mock-product.service';
import { MockUserService } from './../../../core/shared/user/mock-user.service';
import { UserService } from './../../../core/shared/user/user.service';
import { MockAlertService } from './../../../core/shared/alert/mock-alert.service';
import { AlertService } from './../../../core/shared/alert/alert.service';
import { LoaderService } from './../../../core/shared/loader/loader.service';
import { MockLoaderService } from './../../../core/shared/loader/mock-loader.service';
import { ScoreService } from './../../../core/shared/score/score.service';
import { DateService } from './../../../core/shared/util/date.service';
import { MockScoreService } from './../../../core/shared/score/mock-score.service';
import { I18nService } from './../../../core/shared/i18n/i18n.service';
import { environment } from './../../../environments/environment.hockey';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture < ProductListComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          HttpClientModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          MatCardModule,
          MatIconModule,
          MatButtonModule,
          MatGridListModule,
          MatInputModule,
          MatCheckboxModule,
          NgStringPipesModule,
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
        declarations: [ProductListComponent, ProductItemComponent],
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
