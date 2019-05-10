import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { AgendaModule } from '../../shared/agenda/agenda.module';
import { EventService } from '../../shared/agenda/shared/event.service';
import { MockEventService } from '../../shared/agenda/shared/mock-event.service';
import { ArticleService } from '../../shared/article/shared/article.service';
import { MockArticleService } from '../../shared/article/shared/mock-article.service';
import { CartService } from '../../shared/cart/shared/cart.service';
import { MockCartService } from '../../shared/cart/shared/mock-cart.service';
import { CategoryService } from '../../shared/category/category.service';
import { MockCategoryService } from '../../shared/category/mock-category.service';
import { ConversationService } from '../../shared/chat/shared/conversation.service';
import { MockConversationService } from '../../shared/chat/shared/mock-conversation.service';
import { CmsDetailService } from '../../shared/cms-detail/shared/cms-detail.service';
import { MockCmsDetailService } from '../../shared/cms-detail/shared/mock-cms-detail.service';
import { CmsModule } from '../../shared/cms/cms.module';
import { CmsService } from '../../shared/cms/shared/cms.service';
import { MockCmsService } from '../../shared/cms/shared/mock-cms.service';
import { CommentService } from '../../shared/comment/shared/comment.service';
import { MockCommentService } from '../../shared/comment/shared/mock-comment.service';
import { ContactModule } from '../../shared/contact/contact.module';
import { ContactService } from '../../shared/contact/shared/contact.service';
import { MockContactService } from '../../shared/contact/shared/mock-contact.service';
import { DeviceService } from '../../shared/device/device.service';
import { I18nService } from '../../shared/i18n/i18n.service';
import { MapModule } from '../../shared/map/map.module';
import { AreaService } from '../../shared/map/shared/area.service';
import { MapService } from '../../shared/map/shared/map.service';
import { MockAreaService } from '../../shared/map/shared/mock-area.service';
import { MockMapService } from '../../shared/map/shared/mock-map.service';
import { MockMapsAPILoader } from '../../shared/map/shared/mock-maps-api-loader';
import { MediaService } from '../../shared/media/media.service';
import { MockMediaService } from '../../shared/media/mock-media.service';
import { MenuService } from '../../shared/menu/menu.service';
import { MockOfferService } from '../../shared/offer/mock-offer.service';
import { OfferService } from '../../shared/offer/offer.service';
import { MockPartnerService } from '../../shared/partner/mock-partner.service';
import { PartnerService } from '../../shared/partner/partner.service';
import { AlertService } from '../../shared/popup/alert.service';
import { MockAlertService } from '../../shared/popup/mock-alert.service';
import { MockProductService } from '../../shared/product/shared/mock-product.service';
import { ProductService } from '../../shared/product/shared/product.service';
import { MockLocalizeRouterService } from '../../shared/router/mock-localize-router.service';
import { MockSessionService } from '../../shared/session/shared/mock-session.service';
import { SessionService } from '../../shared/session/shared/session.service';
import { SharedModule } from '../../shared/shared.module';
import { configureTestSuite } from '../../shared/unit-test/configure-test-suite';
import { MockUserService } from '../../shared/user/shared/mock-user.service';
import { UserService } from '../../shared/user/shared/user.service';
import { RoutingState } from '../../shared/util/routing-state';
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
        AgendaModule,
        BrowserAnimationsModule,
        ContactModule,
        HttpClientTestingModule,
        LocalizeRouterModule,
        RouterTestingModule,
        MapModule,
        CmsModule,
        SharedModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [
        HomeComponent
      ],
      providers: [
        RoutingState,
        {provide: AreaService, useClass: MockAreaService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: CartService, useClass: MockCartService},
        {provide: CmsService, useClass: MockCmsService},
        {provide: CmsDetailService, useClass: MockCmsDetailService},
        {provide: EventService, useClass: MockEventService},
        {provide: ProductService, useClass: MockProductService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: MapService, useClass: MockMapService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: PartnerService, useClass: MockPartnerService},
        {provide: OfferService, useClass: MockOfferService},
        {provide: ArticleService, useClass: MockArticleService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: UserService, useClass: MockUserService},
        {provide: ContactService, useClass: MockContactService},
        {provide: ConversationService, useClass: MockConversationService},
        {provide: CommentService, useClass: MockCommentService},
        {provide: SessionService, useClass: MockSessionService},
        {provide: MapsAPILoader, useClass: MockMapsAPILoader},
        DeviceService,
        MenuService,
        I18nService
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
