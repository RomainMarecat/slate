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
import { ProductService } from './../../../shared/product/product.service';
import { MockProductService } from './../../../shared/product/mock-product.service';
import { MockUserService } from '../../../shared/user/mock-user.service';
import { UserService } from '../../../shared/user/user.service';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { LoaderService } from './../../../shared/loader/loader.service';
import { MockLoaderService } from './../../../shared/loader/mock-loader.service';
import { ScoreService } from '../../../shared/score/score.service';
import { DateService } from '../../../shared/util/date.service';
import { MockScoreService } from '../../../shared/score/mock-score.service';
import { I18nService } from './../../../shared/i18n/i18n.service';
import { environment } from './../../../environments/environment.hockey';
import { SelectionService } from '../../../shared/selection/selection.service';
import { MockSelectionService } from '../../../shared/selection/mock-selection.service';
import { MenuService } from '../../../shared/menu/menu.service';
import { SharedModule } from '../../../shared/shared.module';

import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

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
      declarations: [ ProductDetailComponent ],
      providers: [
        { provide: ProductService, useClass: MockProductService },
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
