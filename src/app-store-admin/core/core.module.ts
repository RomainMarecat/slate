import { CommonModule } from '@angular/common';
import { Inject, Injectable, InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { TranslateModule } from '@ngx-translate/core';
import { SlackModule } from '@romainmarecat/ngx-slack-notification';
import { Angulartics2Module } from 'angulartics2';
import { AdsenseModule } from 'ng2-adsense';

import { FileUploadModule } from 'ng2-file-upload';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';
import { ImageCropperModule } from 'ngx-img-cropper';
import { EventService } from '../../shared/agenda/shared/event.service';
import { SessionService } from '../../shared/agenda/shared/session.service';
import { ArticleService } from '../../shared/article/shared/article.service';
import { AttributeService } from '../../shared/attribute/attribute.service';
import { BoardService } from '../../shared/board/shared/board.service';
import { CardService } from '../../shared/board/shared/card.service';
import { ColumnService } from '../../shared/board/shared/column.service';
import { CartService } from '../../shared/cart/shared/cart.service';
import { DeliveryService } from '../../shared/cart/shared/delivery.service';
import { CategoryService } from '../../shared/category/category.service';
import { ConversationService } from '../../shared/chat/shared/conversation.service';
import { CmsDetailService } from '../../shared/cms-detail/shared/cms-detail.service';
import { CmsService } from '../../shared/cms/shared/cms.service';
import { CommentService } from '../../shared/comment/shared/comment.service';
import { ContactService } from '../../shared/contact/shared/contact.service';
import { DeviceService } from '../../shared/device/device.service';
import { UserGuard } from '../../shared/guard/user.guard';
import { I18nService } from '../../shared/i18n/i18n.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { AreaService } from '../../shared/map/shared/area.service';
import { MapService } from '../../shared/map/shared/map.service';
import { MediaService } from '../../shared/media/media.service';
import { MenuService } from '../../shared/menu/menu.service';
import { OfferService } from '../../shared/offer/offer.service';
import { OrderService } from '../../shared/order/shared/order.service';
import { PartnerService } from '../../shared/partner/partner.service';
import { PaymentService } from '../../shared/payment/shared/payment.service';
import { AlertService } from '../../shared/popup/alert.service';
import { ProductService } from '../../shared/product/shared/product.service';
import { ScoreService } from '../../shared/score/score.service';
import { SelectionService } from '../../shared/selection/selection.service';
import { SeoService } from '../../shared/seo/shared/seo.service';
import { SharedModule } from '../../shared/shared.module';
import { SidenavService } from '../../shared/sidenav/sidenav.service';
import { UserService } from '../../shared/user/shared/user.service';
import { DateService } from '../../shared/util/date.service';
import { Environment } from '../../shared/util/environment';
import { ObjectService } from '../../shared/util/object.service';
import { DashboardModule } from '../dashboard/dashboard.module';
import { environment } from '../environments/environment';

export const production = new InjectionToken<string>('production');
export const site_name = new InjectionToken<string>('site_name');
export const app_name = new InjectionToken<string>('app_name');
export const firebase = new InjectionToken<FirebaseAppConfig>('firebase');
export const clientAdSense = new InjectionToken<string>('clientAdSense');
export const slotAdSense = new InjectionToken<string>('slotAdSense');
export const facebook_app_id = new InjectionToken<string>('facebook_app_id');

export const CONFIG_TOKEN = new InjectionToken<any>('Registered config');
export const TABLE_ARTICLE = new InjectionToken<string>('article');
export const TABLE_EVENT = new InjectionToken<string>('event');
export const TABLE_AREA = new InjectionToken<string>('area');
export const TABLE_CART = new InjectionToken<string>('cart');
export const TABLE_PRODUCT = new InjectionToken<string>('product');
export const TABLE_CONTACT = new InjectionToken<string>('contact');
export const TABLE_CONVERSATION = new InjectionToken<string>('conversation');
export const TABLE_CATEGORY = new InjectionToken<string>('category');
export const TABLE_SELECTION = new InjectionToken<string>('selection');
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
export const TABLE_BOARD = new InjectionToken<string>('board');
export const TABLE_COLUMN = new InjectionToken<string>('column');
export const TABLE_CARD = new InjectionToken<string>('card');
export const TABLE_PAYMENT = new InjectionToken<string>('payment');
export const STRIPE_KEY = new InjectionToken<string>('');
export const TABLE_DELIVERY = new InjectionToken<string>('delivery');
export const TABLE_SESSION = new InjectionToken<string>('session');

@Injectable()
export class ConfigService {
  configToken: Environment;

  constructor(@Inject(CONFIG_TOKEN) configToken) {
    this.configToken = configToken;
  }
}

export const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    'domain': environment.cookie.domain
  },
  position: 'bottom',
  theme: 'block',
  palette: {
    popup: {
      background: '#131629',
      text: '#ffffff',
      link: '#ffffff'
    },
    button: {
      background: '#90323d',
      text: '#ffffff',
      border: 'transparent'
    }
  },
  type: 'info',
  content: {
    message: 'This website uses cookies to ensure you get the best experience on our website.',
    dismiss: 'Got it !',
    deny: 'Refuse cookies',
    link: 'Learn more',
    href: 'https://cookiesandyou.com'
  }
};

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    Angulartics2Module.forRoot({
      developerMode: !environment.production
    }),
    AdsenseModule.forRoot({
      adClient: environment.clientAdSense,
      adSlot: environment.slotAdSense
    }),
    NgcCookieConsentModule.forRoot(cookieConfig),
    ImageCropperModule,
    FileUploadModule,
    TranslateModule.forChild(),
    SharedModule.forRoot(CONFIG_TOKEN),
    SlackModule.forRoot(environment.slackToken),
    DashboardModule,
  ],
  exports: [
    AdsenseModule,
    TranslateModule,
    SharedModule
  ],
  providers: [
    {provide: FirestoreSettingsToken, useValue: {}},
    {provide: ConfigService, useClass: ConfigService, deps: [CONFIG_TOKEN]},
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
    {provide: TABLE_SCORE, useValue: 'score'},
    {provide: TABLE_BOARD, useValue: 'board'},
    {provide: TABLE_COLUMN, useValue: 'column'},
    {provide: TABLE_CARD, useValue: 'card'},
    {provide: TABLE_DELIVERY, useValue: 'delivery'},
    {provide: TABLE_SESSION, useValue: 'session'},
    {provide: TABLE_EVENT, useValue: 'event'},
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
    {provide: MediaService, useClass: MediaService, deps: [AngularFirestore, TABLE_MEDIA]},
    {provide: DeliveryService, useClass: DeliveryService, deps: [AngularFirestore, TABLE_DELIVERY]},
    {provide: OfferService, useClass: OfferService, deps: [AngularFirestore, TABLE_OFFER]},
    {provide: OrderService, useClass: OrderService, deps: [AngularFirestore, TABLE_ORDER]},
    {provide: MapService, useClass: MapService, deps: [AngularFirestore, TABLE_MAP]},
    {provide: ScoreService, useClass: ScoreService, deps: [AngularFirestore, TABLE_SCORE]},
    {provide: PaymentService, useClass: PaymentService, deps: [AngularFirestore, TABLE_PAYMENT, STRIPE_KEY]},
    {provide: PartnerService, useClass: PartnerService, deps: [AngularFirestore, TABLE_PARTNER]},
    {provide: ProductService, useClass: ProductService, deps: [AngularFirestore, TABLE_PRODUCT]},
    {provide: SelectionService, useClass: SelectionService, deps: [AngularFirestore, TABLE_SELECTION]},
    {provide: BoardService, useClass: BoardService, deps: [AngularFirestore, TABLE_BOARD]},
    {provide: ColumnService, useClass: ColumnService, deps: [AngularFirestore, TABLE_COLUMN]},
    {provide: CardService, useClass: CardService, deps: [AngularFirestore, TABLE_CARD]},
    {provide: EventService, useClass: EventService, deps: [AngularFirestore, TABLE_EVENT]},
    {provide: SessionService, useClass: SessionService, deps: [AngularFirestore, TABLE_SESSION]},
    AlertService,
    DateService,
    DeviceService,
    I18nService,
    LoaderService,
    MenuService,
    ObjectService,
    ScoreService,
    SeoService,
    SidenavService,
    UserGuard,
    UserService,
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule /*, @Inject('CONFIG') config: Environment*/) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: Environment): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: production, useValue: config.production},
        {provide: site_name, useValue: config.site_name},
        {provide: app_name, useValue: config.app_name},
        {provide: firebase, useValue: config.firebase},
      ]
    };
  }
}
