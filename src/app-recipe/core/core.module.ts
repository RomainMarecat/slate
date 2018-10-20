import {
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
  Injectable,
  Inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { AdsenseModule } from 'ng2-adsense';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';

import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ngx-img-cropper';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../../shared/user/shared/user.service';
import { AlertService } from '../../shared/popup/alert.service';
import { ObjectService } from '../../shared/util/object.service';
import { DateService } from '../../shared/util/date.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { MenuService } from '../../shared/menu/menu.service';
import { ScoreService } from '../../shared/score/score.service';
import { SelectionService } from '../../shared/selection/selection.service';
import { SidenavService } from '../../shared/sidenav/sidenav.service';
import { UserGuard } from '../../shared/guard/user.guard';
import { I18nService } from '../../shared/i18n/i18n.service';
import { DeviceService } from '../../shared/device/device.service';
import { FirebaseAppConfig, AngularFireModule } from '@angular/fire';
import { ProductService } from '../../shared/product/shared/product.service';
import { MediaService } from '../../shared/media/media.service';
import { SharedModule } from '../../shared/shared.module';
import { SlackModule } from '../../shared/slack/slack.module';
import { AttributeService } from '../../shared/attribute/attribute.service';
import { PartnerService } from '../../shared/partner/partner.service';
import { OfferService } from '../../shared/offer/offer.service';
import { CommentService } from '../../shared/comment/comment.service';
import { environment } from '../environments/environment';
import { OrderService } from '../../shared/order/shared/order.service';
import { SessionService } from '../../shared/session/shared/session.service';
import { MapService } from '../../shared/map/shared/map.service';
import { CartService } from '../../shared/cart/shared/cart.service';
import { CmsService } from '../../shared/cms/shared/cms.service';
import { AreaService } from '../../shared/map/shared/area.service';
import { CategoryService } from '../../shared/category/category.service';
import { ContactService } from '../../shared/contact/shared/contact.service';
import { ArticleService } from '../../shared/article/shared/article.service';
import { EventService } from '../../shared/agenda/shared/event.service';
import { CmsDetailService } from '../../shared/cms-detail/shared/cms-detail.service';

export const production = new InjectionToken<string>('production');
export const site_name = new InjectionToken<string>('site_name');
export const app_name = new InjectionToken<string>('app_name');
export const firebase = new InjectionToken<FirebaseAppConfig>('firebase');
export const clientAdSense = new InjectionToken<string>('clientAdSense');
export const slotAdSense = new InjectionToken<string>('slotAdSense');
export const slackToken = new InjectionToken<string>('slackToken');
export const facebook_app_id = new InjectionToken<string>('facebook_app_id');

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

@Injectable()
export class ConfigService {
  configToken: any;

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
      background: '#af300b',
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
    AngularFireModule.initializeApp(environment.firebase),
    /*    AngularFirestoreModule,
     */
    AngularFirestoreModule.enablePersistence(),
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ], {
      developerMode: true,
      pageTracking: {
        clearIds: true,
      },
    }),
    AdsenseModule.forRoot({
      adClient: environment.clientAdSense,
      adSlot: environment.slotAdSense
    }),
    NgcCookieConsentModule.forRoot(cookieConfig),
    ImageCropperModule,
    FileUploadModule,
    SharedModule.forRoot(CONFIG_TOKEN),
    SlackModule.forRoot(slackToken),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [ HttpClient, app_name ]
      }
    })
  ],
  exports: [
    AdsenseModule,
    TranslateModule,
    SharedModule
  ],
  providers: [
    {provide: ConfigService, useClass: ConfigService, deps: [CONFIG_TOKEN]},
    {provide: TABLE_ARTICLE, useValue: 'article'},
    {provide: TABLE_AREA, useValue: 'area'},
    {provide: TABLE_ATTRIBUTE, useValue: 'attribute'},
    {provide: TABLE_CART, useValue: 'cart'},
    {provide: TABLE_CONTACT, useValue: 'contact'},
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
    {provide: ArticleService, useClass: ArticleService, deps: [AngularFirestore, TABLE_ARTICLE]},
    {provide: AreaService, useClass: AreaService, deps: [AngularFirestore, TABLE_AREA]},
    {provide: AttributeService, useClass: AttributeService, deps: [AngularFirestore, TABLE_ATTRIBUTE]},
    {provide: CartService, useClass: CartService, deps: [AngularFirestore, TABLE_CART]},
    {provide: ContactService, useClass: ContactService, deps: [AngularFirestore, TABLE_CONTACT]},
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
    AlertService,
    DateService,
    DeviceService,
    I18nService,
    LoaderService,
    MenuService,
    ObjectService,
    ScoreService,
    SidenavService,
    UserGuard,
    UserService,
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
        {provide: production, useValue: config.production},
        {provide: site_name, useValue: config.site_name},
        {provide: app_name, useValue: config.app_name},
        {provide: firebase, useValue: config.firebase},
      ]
    };
  }
}
