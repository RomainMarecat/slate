import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDetailComponent } from './offer-detail.component';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertService } from '../../../shared/popup/alert.service';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { ProductService } from '../../../shared/product/shared/product.service';
import { MockProductService } from '../../../shared/product/shared/mock-product.service';
import { CategoryService } from '../../../shared/category/category.service';
import { MockCategoryService } from '../../../shared/category/mock-category.service';
import { DeviceService } from '../../../shared/device/device.service';
import { OfferService } from '../../../shared/offer/offer.service';
import { MockOfferService } from '../../../shared/offer/mock-offer.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MockCommentService } from '../../../shared/comment/shared/mock-comment.service';
import { CommentService } from '../../../shared/comment/shared/comment.service';
import { MockUserService } from '../../../shared/user/shared/mock-user.service';
import { UserService } from '../../../shared/user/shared/user.service';
import { Angulartics2Module } from 'angulartics2';
import { CommentModule } from '../../../shared/comment/comment.module';
import { configureTestSuite } from '../../../shared/unit-test/configure-test-suite';

describe('OfferDetailComponent', () => {
  let component: OfferDetailComponent;
  let fixture: ComponentFixture<OfferDetailComponent>;

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
        AngularFireStorageModule,
        CommonModule,
        CommentModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        SharedModule
      ],
      declarations: [OfferDetailComponent],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: ProductService, useClass: MockProductService},
        {provide: OfferService, useClass: MockOfferService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: CommentService, useClass: MockCommentService},
        {provide: UserService, useClass: MockUserService},
        DeviceService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
