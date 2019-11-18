import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Angulartics2Module } from 'angulartics2';
import { EventService } from '../../../../../src/shared/agenda/shared/event.service';
import { SessionService } from '../../../../../src/shared/agenda/shared/session.service';
import { ArticleService } from '../../../../../src/shared/article/shared/article.service';
import { AttributeService } from '../../../../../src/shared/attribute/attribute.service';
import { CartService } from '../../../../../src/shared/cart/shared/cart.service';
import { CategoryService } from '../../../../../src/shared/category/category.service';
import { ConversationService } from '../../../../../src/shared/chat/shared/conversation.service';
import { CmsDetailService } from '../../../../../src/shared/cms-detail/shared/cms-detail.service';
import { CmsService } from '../../../../../src/shared/cms/shared/cms.service';
import { CommentService } from '../../../../../src/shared/comment/shared/comment.service';
import { ContactService } from '../../../../../src/shared/contact/shared/contact.service';
import { DeviceService } from '../../../../../src/shared/device/device.service';
import { UserGuard } from '../../../../../src/shared/guard/user.guard';
import { I18nService } from '../../../../../src/shared/i18n/i18n.service';
import { LoaderService } from '../../../../../src/shared/loader/loader.service';
import { AreaService } from '../../../../../src/shared/map/shared/area.service';
import { MediaService } from '../../../../../src/shared/media/media.service';
import { MenuService } from '../../../../../src/shared/menu/menu.service';
import { OfferService } from '../../../../../src/shared/offer/offer.service';
import { OrderService } from '../../../../../src/shared/order/shared/order.service';
import { PartnerService } from '../../../../../src/shared/partner/partner.service';
import { PaymentService } from '../../../../../src/shared/payment/shared/payment.service';
import { AlertService } from '../../../../../src/shared/popup/alert.service';
import { ProductService } from '../../../../../src/shared/product/shared/product.service';
import { ScoreService } from '../../../../../src/shared/score/score.service';
import { SelectionService } from '../../../../../src/shared/selection/selection.service';
import { SidenavModule } from '../../../../../src/shared/sidenav/sidenav.module';
import { SidenavService } from '../../../../../src/shared/sidenav/sidenav.service';
import { UserService } from '../../../../../src/shared/user/shared/user.service';
import { DateService } from '../../../../../src/shared/util/date.service';
import { ObjectService } from '../../../../../src/shared/util/object.service';
import { RoutingState } from '../../../../../src/shared/util/routing-state';
import { environment } from '../../environments/environment';

export const TABLE_EVENT = new InjectionToken<string>('event');
export const TABLE_ARTICLE = new InjectionToken<string>('article');
export const TABLE_AREA = new InjectionToken<string>('area');
export const TABLE_CART = new InjectionToken<string>('cart');
export const TABLE_PRODUCT = new InjectionToken<string>('product');
export const TABLE_CONTACT = new InjectionToken<string>('contact');
export const TABLE_CONVERSATION = new InjectionToken<string>('conversation');
export const TABLE_CATEGORY = new InjectionToken<string>('category');
export const TABLE_SELECTION = new InjectionToken<string>('selection');
export const TABLE_SESSION = new InjectionToken<string>('session');
export const TABLE_SCORE = new InjectionToken<string>('score');
export const TABLE_COMMENT = new InjectionToken<string>('comment');
export const TABLE_CMS = new InjectionToken<string>('cms');
export const TABLE_CMS_DETAIL = new InjectionToken<string>('cms-detail');
export const TABLE_MEDIA = new InjectionToken<string>('media');
export const TABLE_POST = new InjectionToken<string>('post');
export const TABLE_ATTRIBUTE = new InjectionToken<string>('attribute');
export const TABLE_MAP = new InjectionToken<string>('map');
export const TABLE_OFFER = new InjectionToken<string>('offer');
export const TABLE_ORDER = new InjectionToken<string>('order');
export const TABLE_PARTNER = new InjectionToken<string>('partner');
export const TABLE_PAYMENT = new InjectionToken<string>('payment');
export const STRIPE_KEY = new InjectionToken<string>('');

export function metaFactory(translate: TranslateService): MetaLoader {
  return new MetaStaticLoader({
    callback: (key: string) => translate.get(key),
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' - ',
    applicationName: 'meta.application_name',
    defaults: {
      title: 'meta.defaults.title',
      description: 'meta.defaults.description',
    }
  });
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `./assets/i18n/`, '.json');
}

export function getLanguageFactory(i18nService: I18nService) {
  return () => i18nService.addLanguage(true);
}

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    Angulartics2Module.forRoot({
      developerMode: true,
      pageTracking: {
        clearIds: true,
      },
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory),
      deps: [TranslateService]
    }),
  ],
  providers: [
    {provide: TABLE_ARTICLE, useValue: 'article'},
    {provide: TABLE_AREA, useValue: 'area'},
    {provide: TABLE_ATTRIBUTE, useValue: 'attribute'},
    {provide: TABLE_CART, useValue: 'cart'},
    {provide: TABLE_CONTACT, useValue: 'contact'},
    {provide: TABLE_CONVERSATION, useValue: 'conversation'},
    {provide: TABLE_CATEGORY, useValue: 'category'},
    {provide: TABLE_COMMENT, useValue: 'comment'},
    {provide: TABLE_CMS, useValue: 'cms'},
    {provide: TABLE_CMS_DETAIL, useValue: 'cms-detail'},
    {provide: TABLE_EVENT, useValue: 'event'},
    {provide: TABLE_MAP, useValue: 'map'},
    {provide: TABLE_MEDIA, useValue: 'media'},
    {provide: TABLE_OFFER, useValue: 'offer'},
    {provide: TABLE_ORDER, useValue: 'order'},
    {provide: TABLE_POST, useValue: 'post'},
    {provide: TABLE_PARTNER, useValue: 'partner'},
    {provide: TABLE_PAYMENT, useValue: 'payment'},
    {provide: TABLE_PRODUCT, useValue: 'product'},
    {provide: TABLE_SELECTION, useValue: 'selection'},
    {provide: TABLE_SESSION, useValue: 'session'},
    {provide: TABLE_SCORE, useValue: 'scores'},
    {provide: STRIPE_KEY, useValue: environment.stripeKey},
    {provide: ArticleService, useClass: ArticleService, deps: [AngularFirestore, TABLE_ARTICLE]},
    {provide: AreaService, useClass: AreaService, deps: [AngularFirestore, TABLE_AREA]},
    {provide: AttributeService, useClass: AttributeService, deps: [AngularFirestore, TABLE_ATTRIBUTE]},
    {provide: CartService, useClass: CartService, deps: [AngularFirestore, TABLE_CART]},
    {provide: ContactService, useClass: ContactService, deps: [AngularFirestore, TABLE_CONTACT]},
    {provide: ConversationService, useClass: ConversationService, deps: [AngularFirestore, TABLE_CONVERSATION]},
    {provide: CategoryService, useClass: CategoryService, deps: [AngularFirestore, TABLE_CATEGORY]},
    {provide: CmsService, useClass: CmsService, deps: [AngularFirestore, TABLE_CMS]},
    {provide: CmsDetailService, useClass: CmsDetailService, deps: [AngularFirestore, TABLE_CMS_DETAIL]},
    {provide: CommentService, useClass: CommentService, deps: [AngularFirestore, TABLE_COMMENT]},
    {provide: EventService, useClass: EventService, deps: [AngularFirestore, TABLE_EVENT]},
    {provide: MediaService, useClass: MediaService, deps: [AngularFirestore, TABLE_MEDIA]},
    {provide: OfferService, useClass: OfferService, deps: [AngularFirestore, TABLE_OFFER]},
    {provide: OrderService, useClass: OrderService, deps: [AngularFirestore, TABLE_ORDER]},
    {provide: ScoreService, useClass: ScoreService, deps: [AngularFirestore, TABLE_SCORE]},
    {provide: PartnerService, useClass: PartnerService, deps: [AngularFirestore, TABLE_PARTNER]},
    {provide: PaymentService, useClass: PaymentService, deps: [AngularFirestore, TABLE_PAYMENT, STRIPE_KEY]},
    {provide: ProductService, useClass: ProductService, deps: [AngularFirestore, TABLE_PRODUCT]},
    {provide: SelectionService, useClass: SelectionService, deps: [AngularFirestore, TABLE_SELECTION]},
    {provide: SessionService, useClass: SessionService, deps: [AngularFirestore, TABLE_SESSION]},
    AlertService,
    DateService,
    DeviceService,
    {
      provide: APP_INITIALIZER,
      useFactory: getLanguageFactory,
      deps: [I18nService],
      multi: true
    },
    LoaderService,
    MenuService,
    ObjectService,
    ScoreService,
    SidenavService,
    UserGuard,
    UserService,
    RoutingState
  ],
  exports: [
    SidenavModule
  ]
})
export class CoreModule {
}
