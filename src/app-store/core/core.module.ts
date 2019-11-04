import { Inject, Injectable, InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SessionService } from '../../shared/agenda/shared/session.service';
import { ConversationService } from '../../shared/chat/shared/conversation.service';
import { MenuService } from '../../shared/menu/menu.service';
import { AngularFirestore, AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { UserService } from '../../shared/user/shared/user.service';
import { AlertService } from '../../shared/popup/alert.service';
import { ObjectService } from '../../shared/util/object.service';
import { DateService } from '../../shared/util/date.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { ScoreService } from '../../shared/score/score.service';
import { SidenavService } from '../../shared/sidenav/sidenav.service';
import { UserGuard } from '../../shared/guard/user.guard';
import { I18nService } from '../../shared/i18n/i18n.service';
import { DeviceService } from '../../shared/device/device.service';
import CloudinaryConfiguration from '../../shared/media/cloudinary/cloudinary-configuration.class';
import { ProductService } from '../../shared/product/shared/product.service';
import { MediaService } from '../../shared/media/media.service';
import { environment } from '../environments/environment';
import { CmsService } from '../../shared/cms/shared/cms.service';
import { CmsDetailService } from '../../shared/cms-detail/shared/cms-detail.service';
import { AttributeService } from '../../shared/attribute/attribute.service';
import { CommentService } from '../../shared/comment/shared/comment.service';
import { OfferService } from '../../shared/offer/offer.service';
import { PartnerService } from '../../shared/partner/partner.service';
import { SelectionService } from '../../shared/selection/selection.service';
import { AreaService } from '../../shared/map/shared/area.service';
import { EventService } from '../../shared/agenda/shared/event.service';
import { MapService } from '../../shared/map/shared/map.service';
import { ArticleService } from '../../shared/article/shared/article.service';
import { CategoryService } from '../../shared/category/category.service';
import { OrderService } from '../../shared/order/shared/order.service';
import { CartService } from '../../shared/cart/shared/cart.service';
import { ContactService } from '../../shared/contact/shared/contact.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatSnackBarModule } from '@angular/material';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';
import { FooterModule } from '../../shared/footer/footer.module';
import { StorageModule } from '../../shared/media/storage/storage.module';
import { PopupModule } from '../../shared/popup/popup.module';
import { DeliveryService } from '../../shared/cart/shared/delivery.service';
import { FavoriteService } from '../../shared/favorite/shared/favorite.service';
import { BreadcrumbModule } from '../../shared/breadcrumb/breadcrumb.module';
import { PaymentService } from '../../shared/payment/shared/payment.service';
import { ShippingService } from '../../shared/shipping/shared/shipping.service';

export const production = new InjectionToken<string>('production');
export const firebase = new InjectionToken<FirebaseAppConfig>('firebase');
export const cloudinary = new InjectionToken<CloudinaryConfiguration>('cloudinary');
export const clientAdSense = new InjectionToken<string>('clientAdSense');
export const slotAdSense = new InjectionToken<string>('slotAdSense');

export function createTranslateLoader(http: HttpClient, name: string) {
  return new TranslateHttpLoader(http, `./assets/i18n/`, '.json');
}

export const CONFIG_TOKEN = new InjectionToken<any>('Registered config');

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
export const TABLE_DELIVERY = new InjectionToken<string>('delivery');
export const TABLE_FAVORITE = new InjectionToken<string>('favorite');
export const TABLE_SHIPPING = new InjectionToken<string>('shipping');
export const STRIPE_KEY = new InjectionToken<string>('');

@Injectable()
export class ConfigService {
  configToken: any;

  constructor(@Inject(CONFIG_TOKEN) configToken) {
    this.configToken = configToken;
  }
}

export const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.cookie.domain
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
      background: '#f4c71d',
      text: '#2f2f30',
      border: 'transparent'
    }
  },
  type: 'info',
  content: {
    message: 'Ce site utilise les cookies pour assurer la meilleure expérience utilisateur.',
    dismiss: 'OK',
    deny: 'Refuser les cookies',
    link: 'En savoir plus',
    href: 'https://cookiesandyou.com'
  }
};

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase, environment.firebase.projectId),
    AngularFirestoreModule.enablePersistence(),
    HttpClientModule,
    MatSnackBarModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    FooterModule,
    StorageModule,
    PopupModule
  ],
  exports: [
    BreadcrumbModule,
    FooterModule,
    StorageModule
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
    {provide: TABLE_DELIVERY, useValue: 'delivery'},
    {provide: TABLE_FAVORITE, useValue: 'favorite'},
    {provide: TABLE_SCORE, useValue: 'score'},
    {provide: TABLE_PRODUCT, useValue: 'product'},
    {provide: TABLE_SHIPPING, useValue: 'shipping'},
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
    {provide: MapService, useClass: MapService, deps: [AngularFirestore, TABLE_MAP]},
    {provide: ScoreService, useClass: ScoreService, deps: [AngularFirestore, TABLE_SCORE]},
    {provide: PartnerService, useClass: PartnerService, deps: [AngularFirestore, TABLE_PARTNER]},
    {provide: ProductService, useClass: ProductService, deps: [AngularFirestore, TABLE_PRODUCT]},
    {provide: SelectionService, useClass: SelectionService, deps: [AngularFirestore, TABLE_SELECTION]},
    {provide: SessionService, useClass: SessionService, deps: [AngularFirestore, TABLE_SESSION]},
    {provide: DeliveryService, useClass: DeliveryService, deps: [AngularFirestore, TABLE_DELIVERY]},
    {provide: FavoriteService, useClass: FavoriteService, deps: [AngularFirestore, TABLE_FAVORITE]},
    {provide: ShippingService, useClass: ShippingService, deps: [AngularFirestore, TABLE_SHIPPING]},
    {provide: PaymentService, useClass: PaymentService, deps: [AngularFirestore, TABLE_PAYMENT, STRIPE_KEY]},
    UserService,
    AlertService,
    MenuService,
    ObjectService,
    DateService,
    LoaderService,
    SidenavService,
    UserGuard,
    I18nService,
    DeviceService,
    {provide: FirestoreSettingsToken, useValue: {}}
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: any): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: STRIPE_KEY, useValue: config.stripeKey},
        {provide: production, useValue: config.production},
        {provide: firebase, useValue: config.firebase},
        {provide: cloudinary, useValue: config.cloudinary}
      ]
    };
  }
}
