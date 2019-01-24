import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleEditComponent } from './article-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Angulartics2Module } from 'angulartics2';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxEditorModule } from 'ngx-editor';
import { SharedModule } from '../../../shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MockArticleService } from '../../../article/shared/mock-article.service';
import { ArticleService } from '../../../article/shared/article.service';
import { LoaderService } from '../../../loader/loader.service';
import { AttributeService } from '../../../attribute/attribute.service';
import { I18nService } from '../../../i18n/i18n.service';
import { MockMediaService } from '../../../media/mock-media.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { NotificationService } from '../../../slack/notification.service';
import { MediaService } from '../../../media/media.service';
import { AlertService } from '../../../popup/alert.service';
import { ObjectService } from '../../../util/object.service';
import { MockLoaderService } from '../../../loader/mock-loader.service';
import { MockNotificationService } from '../../../slack/mock-notification.service';
import { DeviceService } from '../../../device/device.service';
import { UserService } from '../../../user/shared/user.service';
import { MockCategoryService } from '../../../category/mock-category.service';
import { MockUserService } from '../../../user/shared/mock-user.service';
import { CategoryService } from '../../../category/category.service';
import { DateService } from '../../../util/date.service';
import { MockAttributeService } from '../../../attribute/mock-attribute.service';
import { MockProductService } from '../../../product/shared/mock-product.service';
import { ProductService } from '../../../product/shared/product.service';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { MockLocalizeRouterService } from '../../../router/mock-localize-router.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../../../../app-car/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';

describe('ArticleEditComponent', () => {
  let component: ArticleEditComponent;
  let fixture: ComponentFixture<ArticleEditComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        AngularFireAuthModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SharedModule,
        NgxEditorModule,
        NgxDatatableModule,
        LocalizeRouterModule,
        Angulartics2Module.forRoot( {
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [ArticleEditComponent],
      providers: [
        {provide: ArticleService, useClass: MockArticleService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: UserService, useClass: MockUserService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: ProductService, useClass: MockProductService},
        {provide: NotificationService, useClass: MockNotificationService},
        {provide: AttributeService, useClass: MockAttributeService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        DateService,
        ObjectService,
        I18nService,
        DeviceService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
