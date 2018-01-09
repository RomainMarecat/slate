import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { NgPipesModule } from 'ngx-pipes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductItemComponent } from './product-item.component';
import { ProductActionComponent } from './product-action/product-action.component';
import { ImageComponent } from '../../shared/cloudinary/image/image.component';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../shared/cloudinary/cloudinary.module';
import { CloudinaryConfig } from '../../shared/cloudinary/cloudinary-config';
import { DateService } from '../../shared/util/date.service';
import { I18nService } from '../../shared/i18n/i18n.service';
import { environment } from './../../environments/environment.monpullmoche';

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
        declarations: [ProductItemComponent, ProductActionComponent],
        providers: [
          { provide: DateService, useClass: DateService },
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
