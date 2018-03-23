import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemComponent } from './product-item.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatCardModule, MatIconModule } from '@angular/material';
import { Angulartics2Module } from 'angulartics2';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CloudinaryModule } from '../../../shared/cloudinary/cloudinary.module';
import { CommonModule } from '@angular/common';
import { NgPipesModule } from 'ngx-pipes';
import { environment } from '../../../environments/environment.hockey';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Cloudinary } from 'cloudinary-core';
import { BrowserModule } from '@angular/platform-browser';
import { MockProductService } from '../../../shared/product/mock-product.service';
import { MediaService } from '../../../shared/media/media.service';
import { ProductService } from '../../../shared/product/product.service';
import { MockUserService } from '../../../shared/user/mock-user.service';
import { MockMediaService } from '../../../shared/media/mock-media.service';
import { UserService } from '../../../shared/user/user.service';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        BrowserModule,
        HttpClientTestingModule,
        MatIconModule,
        MatCardModule,
        NgPipesModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatCardModule,
        Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ], {
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        CloudinaryModule.forRoot({Cloudinary: Cloudinary}, environment.cloudinary),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [ ProductItemComponent ],
      providers: [
        {provide: ProductService, useClass: MockProductService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: UserService, useClass: MockUserService},
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
