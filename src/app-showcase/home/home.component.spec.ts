import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductService } from '../../shared/product/product.service';
import { MockCommentService } from '../../shared/comment/mock-comment.service';
import { MockOfferService } from '../../shared/offer/mock-offer.service';
import { MockAlertService } from '../../shared/popup/mock-alert.service';
import { AlertService } from '../../shared/popup/alert.service';
import { MockProductService } from '../../shared/product/mock-product.service';
import { OfferService } from '../../shared/offer/offer.service';
import { DeviceService } from '../../shared/device/device.service';
import { CommentService } from '../../shared/comment/comment.service';
import { MockCategoryService } from '../../shared/category/mock-category.service';
import { UserService } from '../../shared/user/user.service';
import { MockUserService } from '../../shared/user/mock-user.service';
import { CategoryService } from '../../shared/category/category.service';
import { ArticleService } from '../../shared/article/shared/article.service';
import { MockArticleService } from '../../shared/article/shared/mock-article.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { environment } from '../../environments/environment.blog';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MenuService } from '../../shared/menu/menu.service';
import { ContactModule } from '../../shared/contact/contact.module';
import { MockContactService } from '../../shared/contact/shared/mock-contact.service';
import { ContactService } from '../../shared/contact/shared/contact.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgendaModule } from '../../shared/agenda/agenda.module';
import { I18nService } from '../../shared/i18n/i18n.service';
import { MockPartnerService } from '../../shared/partner/mock-partner.service';
import { PartnerService } from '../../shared/partner/partner.service';
import { MockMediaService } from '../../shared/media/mock-media.service';
import { MediaService } from '../../shared/media/media.service';
import { MockAreaService } from '../../shared/map/shared/mock-area.service';
import { AreaService } from '../../shared/map/shared/area.service';
import { MockMapService } from '../../shared/map/shared/mock-map.service';
import { MapService } from '../../shared/map/shared/map.service';
import { MockCmsService } from '../../shared/cms/shared/mock-cms.service';
import { CmsService } from '../../shared/cms/shared/cms.service';
import { CmsDetailService } from '../../shared/cms-detail/shared/cms-detail.service';
import { MockCmsDetailService } from '../../shared/cms-detail/shared/mock-cms-detail.service';
import { MockEventService } from '../../shared/agenda/shared/mock-event.service';
import { EventService } from '../../shared/agenda/shared/event.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockMapsAPILoader } from '../../shared/map/shared/mock-maps-api-loader';
import { MockBookingService } from '../../shared/booking/shared/mock-booking.service';
import { BookingService } from '../../shared/booking/shared/booking.service';
import { SessionService } from '../../shared/session/shared/session.service';
import { MockSessionService } from '../../shared/session/shared/mock-session.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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
        RouterTestingModule,
        SharedModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [ HomeComponent ],
      providers: [
        {provide: AreaService, useClass: MockAreaService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: BookingService, useClass: MockBookingService},
        {provide: CmsService, useClass: MockCmsService},
        {provide: CmsDetailService, useClass: MockCmsDetailService},
        {provide: EventService, useClass: MockEventService},
        {provide: ProductService, useClass: MockProductService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: MapService, useClass: MockMapService},
        {provide: PartnerService, useClass: MockPartnerService},
        {provide: OfferService, useClass: MockOfferService},
        {provide: ArticleService, useClass: MockArticleService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: ContactService, useClass: MockContactService},
        {provide: CommentService, useClass: MockCommentService},
        {provide: SessionService, useClass: MockSessionService},
        {provide: UserService, useClass: MockUserService},
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
