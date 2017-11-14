import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
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
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { NgStringPipesModule } from 'angular-pipes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './product-list.component';
import { ProductItemComponent } from './../product-item/product-item.component';
import { ProductActionComponent } from './../product-item/product-action/product-action.component';
import { ImageComponent } from './../shared/cloudinary/image/image.component';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from './../shared/cloudinary/cloudinary.module';
import { CloudinaryConfig } from './../shared/cloudinary/cloudinary-config';
import { ProductService } from './../shared/product/product.service';
import { MockProductService } from './../shared/product/mock-product.service';
import { MockUserService } from './../shared/user/mock-user.service';
import { UserService } from './../shared/user/user.service';
import { MockAlertService } from './../shared/alert/mock-alert.service';
import { AlertService } from './../shared/alert/alert.service';
import { LoaderService } from './../shared/loader/loader.service';
import { MockLoaderService } from './../shared/loader/mock-loader.service';
import { ScoreService } from './../shared/score/score.service';
import { DateService } from './../shared/util/date.service';
import { MockScoreService } from './../shared/score/mock-score.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture < ProductListComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          BrowserModule,
          HttpModule,
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
          CloudinaryModule.forRoot({ Cloudinary: Cloudinary }, CloudinaryConfig),
        ],
        declarations: [ProductListComponent, ProductItemComponent, ProductActionComponent, ImageComponent],
        providers: [
          { provide: ProductService, useClass: MockProductService },
          { provide: UserService, useClass: MockUserService },
          { provide: AlertService, useClass: MockAlertService },
          { provide: LoaderService, useClass: MockLoaderService },
          { provide: ScoreService, useClass: MockScoreService },
          { provide: DateService, useClass: DateService }
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
