import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductService } from '../../shared/product/shared/product.service';
import { MockCommentService } from '../../shared/comment/shared/mock-comment.service';
import { MockOfferService } from '../../shared/offer/mock-offer.service';
import { MockAlertService } from '../../shared/popup/mock-alert.service';
import { AlertService } from '../../shared/popup/alert.service';
import { MockProductService } from '../../shared/product/shared/mock-product.service';
import { OfferService } from '../../shared/offer/offer.service';
import { DeviceService } from '../../shared/device/device.service';
import { CommentService } from '../../shared/comment/shared/comment.service';
import { MockCategoryService } from '../../shared/category/mock-category.service';
import { UserService } from '../../shared/user/shared/user.service';
import { MockUserService } from '../../shared/user/shared/mock-user.service';
import { CategoryService } from '../../shared/category/category.service';
import { ArticleService } from '../../shared/article/shared/article.service';
import { MockArticleService } from '../../shared/article/shared/mock-article.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { environment } from '../environments/environment';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MenuService } from '../../shared/menu/menu.service';
import { ContactModule } from '../../shared/contact/contact.module';
import { MockContactService } from '../../shared/contact/shared/mock-contact.service';
import { ContactService } from '../../shared/contact/shared/contact.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockMapsAPILoader } from '../../shared/map/shared/mock-maps-api-loader';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../../shared/router/mock-localize-router.service';
import { configureTestSuite } from '../../shared/unit-test/configure-test-suite';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AgmCoreModule.forRoot({
          apiKey: environment.googleMapApiKey
        }),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ContactModule,
        RouterTestingModule,
        LocalizeRouterModule,
        SharedModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [HomeComponent],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: ProductService, useClass: MockProductService},
        {provide: OfferService, useClass: MockOfferService},
        {provide: ArticleService, useClass: MockArticleService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: ContactService, useClass: MockContactService},
        {provide: CommentService, useClass: MockCommentService},
        {provide: UserService, useClass: MockUserService},
        {provide: MapsAPILoader, useClass: MockMapsAPILoader},
        DeviceService,
        MenuService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
