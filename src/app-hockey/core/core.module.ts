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
import { ImageCropperModule } from 'ng2-img-cropper';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { UserService } from '../../shared/user/user.service';
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
import CloudinaryConfiguration from '../../shared/cloudinary/cloudinary-configuration.class';
import { FirebaseAppConfig, AngularFireModule } from 'angularfire2';
import { Environment } from '../../shared/util/environment';
import { ProductService } from '../../shared/product/product.service';
import { MediaService } from '../../shared/media/media.service';
import { CloudinaryModule } from '../../shared/cloudinary/cloudinary.module';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../environments/environment.hockey';
import { SlackModule } from '../../shared/slack/slack.module';
import { ProductListModule } from '../product-list/product-list.module';
import { ProductDetailModule } from '../product-detail/product-detail.module';
import { SelectionModule } from '../selection/selection.module';
import { AttributeService } from '../../shared/attribute/attribute.service';
import { VisitorService } from '../../shared/firestore/visitor.service';

export const production = new InjectionToken < string > ('production');
export const site_name = new InjectionToken < string > ('site_name');
export const app_name = new InjectionToken < string > ('app_name');
export const firebase = new InjectionToken < FirebaseAppConfig > ('firebase');
export const cloudinary = new InjectionToken < CloudinaryConfiguration > ('cloudinary');
export const clientAdSense = new InjectionToken < string > ('clientAdSense');
export const slotAdSense = new InjectionToken < string > ('slotAdSense');
export const slackToken = new InjectionToken < string > ('slackToken');
export const facebook_app_id = new InjectionToken < string > ('facebook_app_id');

export function createTranslateLoader(http: HttpClient, name: string) {
  return new TranslateHttpLoader(http, `./assets/i18n/${name}/`, '.json');
}

export const CONFIG_TOKEN = new InjectionToken < Environment > ('Registered config');
export const TABLE_NAME = new InjectionToken < string > ('attribute');

@Injectable()
export class ConfigService {
  configToken: Environment;
  constructor(@Inject(CONFIG_TOKEN) configToken) {
    this.configToken = configToken;
  }
}

export const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    'domain': environment.site_name
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
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
      developerMode: true,
      pageTracking: {
        clearIds: true,
      },
    }),
    AdsenseModule.forRoot({
      adClient: environment.clientAdSense,
      adSlot: environment.slotAdSense
    }),
    CloudinaryModule.forRoot({ Cloudinary: CloudinaryCore },
      environment.cloudinary
    ),
    ModalModule.forRoot(),
    NgcCookieConsentModule.forRoot(cookieConfig),
    ImageCropperModule,
    FileUploadModule,
    SharedModule.forRoot(CONFIG_TOKEN),
    SlackModule.forRoot(slackToken),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient, app_name]
      }
    }),
    ProductListModule,
    SelectionModule,
    ProductDetailModule
  ],
  exports: [
    AdsenseModule,
    TranslateModule,
    SharedModule
  ],
  providers: [
    { provide: ConfigService, useClass: ConfigService, deps: [CONFIG_TOKEN] },
    { provide: ProductService, useClass: ProductService, deps: [AngularFirestore, app_name] },
    { provide: MediaService, useClass: MediaService, deps: [AngularFirestore, app_name] },
    { provide: SelectionService, useClass: SelectionService, deps: [AngularFirestore, app_name] },
    { provide: TABLE_NAME, useValue: 'attribute' },
    { provide: AttributeService, useClass: VisitorService, deps: [AngularFirestore, TABLE_NAME] },
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

  constructor(@Optional() @SkipSelf() parentModule: CoreModule /*, @Inject('CONFIG') config: Environment*/ ) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: Environment): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: production, useValue: config.production },
        { provide: site_name, useValue: config.site_name },
        { provide: app_name, useValue: config.app_name },
        { provide: firebase, useValue: config.firebase },
        { provide: cloudinary, useValue: config.cloudinary },
      ]
    };
  }
}
