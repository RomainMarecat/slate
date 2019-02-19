import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angulartics2Module } from 'angulartics2';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule
} from '@angular/material';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../../media/cloudinary/cloudinary.module';
import { ProductPreviewComponent } from './product-preview.component';
import { DateService } from '../../../util/date.service';
import { I18nService } from '../../../i18n/i18n.service';
import { MediaModule } from '../../../media/media.module';
import { environment } from '../../../../app-store/environments/environment';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';

describe('ProductPreviewComponent', () => {
  let component: ProductPreviewComponent;
  let fixture: ComponentFixture<ProductPreviewComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        BrowserModule,
        HttpClientModule,
        RouterTestingModule,
        NgPipesModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatInputModule,
        MatCheckboxModule,
        MatListModule,
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
      declarations: [ProductPreviewComponent],
      providers: [
        {provide: DateService, useClass: DateService},
        I18nService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
