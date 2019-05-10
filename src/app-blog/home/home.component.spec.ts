import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { ArticleModule } from '../../shared/article/article.module';
import { ArticleService } from '../../shared/article/shared/article.service';
import { MockArticleService } from '../../shared/article/shared/mock-article.service';
import { CategoryService } from '../../shared/category/category.service';
import { MockCategoryService } from '../../shared/category/mock-category.service';
import { ChatModule } from '../../shared/chat/chat.module';
import { ConversationService } from '../../shared/chat/shared/conversation.service';
import { MockConversationService } from '../../shared/chat/shared/mock-conversation.service';
import { CommentService } from '../../shared/comment/shared/comment.service';
import { MockCommentService } from '../../shared/comment/shared/mock-comment.service';
import { ContactModule } from '../../shared/contact/contact.module';
import { ContactService } from '../../shared/contact/shared/contact.service';
import { MockContactService } from '../../shared/contact/shared/mock-contact.service';
import { DeviceService } from '../../shared/device/device.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { MockLoaderService } from '../../shared/loader/mock-loader.service';
import { MapModule } from '../../shared/map/map.module';
import { MockMapsAPILoader } from '../../shared/map/shared/mock-maps-api-loader';
import { MediaService } from '../../shared/media/media.service';
import { MockMediaService } from '../../shared/media/mock-media.service';
import { MenuService } from '../../shared/menu/menu.service';
import { MockOfferService } from '../../shared/offer/mock-offer.service';
import { OfferService } from '../../shared/offer/offer.service';
import { AlertService } from '../../shared/popup/alert.service';
import { MockAlertService } from '../../shared/popup/mock-alert.service';
import { MockProductService } from '../../shared/product/shared/mock-product.service';
import { ProductService } from '../../shared/product/shared/product.service';
import { MockLocalizeRouterService } from '../../shared/router/mock-localize-router.service';
import { SeoService } from '../../shared/seo/shared/seo.service';
import { SharedModule } from '../../shared/shared.module';
import { configureTestSuite } from '../../shared/unit-test/configure-test-suite';
import { MockUserService } from '../../shared/user/shared/mock-user.service';
import { UserService } from '../../shared/user/shared/user.service';
import { environment } from '../environments/environment';

import { HomeComponent } from './home.component';

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
        ArticleModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ContactModule,
        RouterTestingModule,
        MapModule,
        LocalizeRouterModule,
        SharedModule,
        ChatModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [HomeComponent],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: ProductService, useClass: MockProductService},
        {provide: SeoService, useClass: SeoService},
        {provide: OfferService, useClass: MockOfferService},
        {provide: ArticleService, useClass: MockArticleService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: ContactService, useClass: MockContactService},
        {provide: ConversationService, useClass: MockConversationService},
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
