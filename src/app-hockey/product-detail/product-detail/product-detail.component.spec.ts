import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../../shared/media/cloudinary/cloudinary.module';
import { ProductService } from '../../../shared/product/shared/product.service';
import { MockProductService } from '../../../shared/product/shared/mock-product.service';
import { MockUserService } from '../../../shared/user/shared/mock-user.service';
import { UserService } from '../../../shared/user/shared/user.service';
import { DeviceService } from '../../../shared/device/device.service';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { LoaderService } from '../../../shared/loader/loader.service';
import { MockLoaderService } from '../../../shared/loader/mock-loader.service';
import { ScoreService } from '../../../shared/score/score.service';
import { DateService } from '../../../shared/util/date.service';
import { MockScoreService } from '../../../shared/score/mock-score.service';
import { SelectionService } from '../../../shared/selection/selection.service';
import { MockSelectionService } from '../../../shared/selection/mock-selection.service';
import { SharedModule } from '../../../shared/shared.module';
import { CommentService } from '../../../shared/comment/shared/comment.service';
import { MockCommentService } from '../../../shared/comment/shared/mock-comment.service';

import { ProductDetailComponent } from './product-detail.component';
import { ProductActionComponent } from '../product-action/product-action.component';
import { ProductAttributeComponent } from '../product-attribute/product-attribute.component';
import { ProductDescriptionComponent } from '../product-description/product-description.component';
import { environment } from '../../environments/environment';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ], {
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        CloudinaryModule.forRoot({Cloudinary: Cloudinary}, environment.cloudinary),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        SharedModule
      ],
      declarations: [
        ProductDetailComponent,
        ProductActionComponent,
        ProductAttributeComponent,
        ProductDescriptionComponent
      ],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: CommentService, useClass: MockCommentService},
        {provide: DateService, useClass: DateService},
        {provide: DeviceService, useClass: DeviceService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: ProductService, useClass: MockProductService},
        {provide: ScoreService, useClass: MockScoreService},
        {provide: SelectionService, useClass: MockSelectionService},
        {provide: UserService, useClass: MockUserService},
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
