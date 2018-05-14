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
import { AngularFireModule } from 'angularfire2';
import { Angulartics2Module } from 'angulartics2';
import { AdsenseModule } from 'ng2-adsense';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MenuService } from '../../shared/menu/menu.service';

import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { UserService } from '../../shared/user/user.service';
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
import { FirebaseAppConfig } from 'angularfire2';
import { ProductService } from '../../shared/product/product.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { MediaService } from '../../shared/media/media.service';
import { CloudinaryModule } from '../../shared/media/cloudinary/cloudinary.module';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductFormComponent } from '../product-add/product-form/product-form.component';
import { ProductActionComponent } from '../product-item/product-action/product-action.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductPreviewComponent } from '../product-add/product-preview/product-preview.component';
import { SharedModule } from '../../shared/shared.module';
import { SlackModule } from '../../shared/slack/slack.module';
import { environment } from '../environments/environment';
import { CmsService } from '../../shared/cms/shared/cms.service';
import { CmsDetailService } from '../../shared/cms-detail/shared/cms-detail.service';
import { AttributeService } from '../../shared/attribute/attribute.service';
import { CommentService } from '../../shared/comment/comment.service';
import { OfferService } from '../../shared/offer/offer.service';
import { PartnerService } from '../../shared/partner/partner.service';
import { SelectionService } from '../../shared/selection/selection.service';

export const production = new InjectionToken<string>('production');
export const site_name = new InjectionToken<string>('site_name');
export const app_name = new InjectionToken<string>('app_name');
export const firebase = new InjectionToken<FirebaseAppConfig>('firebase');
export const cloudinary = new InjectionToken<CloudinaryConfiguration>('cloudinary');
export const clientAdSense = new InjectionToken<string>('clientAdSense');
export const slotAdSense = new InjectionToken<string>('slotAdSense');
export const slackToken = new InjectionToken<string>('slackToken');
export const facebook_app_id = new InjectionToken<string>('facebook_app_id');

export function createTranslateLoader(http: HttpClient, name: string) {
  return new TranslateHttpLoader(http, `./assets/i18n/`, '.json');
}

export const CONFIG_TOKEN = new InjectionToken<any>('Registered config');

export const TABLE_PRODUCT = new InjectionToken<string>('clothes');
export const TABLE_CATEGORY = new InjectionToken<string>('category');
export const TABLE_SELECTION = new InjectionToken<string>('selection');
export const TABLE_SCORE = new InjectionToken<string>('score');
export const TABLE_COMMENT = new InjectionToken<string>('comment');
export const TABLE_CMS = new InjectionToken<string>('cms');
export const TABLE_CMS_DETAIL = new InjectionToken<string>('cms-detail');
export const TABLE_MEDIA = new InjectionToken<string>('media');
export const TABLE_POST = new InjectionToken<string>('post');
export const TABLE_ATTRIBUTE = new InjectionToken<string>('attribute');
export const TABLE_OFFER = new InjectionToken<string>('offer');
export const TABLE_PARTNER = new InjectionToken<string>('partner');

@Injectable()
export class ConfigService {
  configToken: any;

  constructor(@Inject(CONFIG_TOKEN) configToken) {
    this.configToken = configToken;
  }
}

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    Angulartics2Module,
    AdsenseModule.forRoot({
      adClient: environment.clientAdSense,
      adSlot: environment.slotAdSense
    }),
    CloudinaryModule.forRoot({Cloudinary: CloudinaryCore},
      environment.cloudinary
    ),
    SharedModule.forRoot(CONFIG_TOKEN),
    SlackModule.forRoot(slackToken),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [ HttpClient, app_name ]
      }
    }),
  ],
  exports: [
    TranslateModule,
    AdsenseModule,
    SharedModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductItemComponent,
    ProductAddComponent,
    ProductFormComponent,
    ProductPreviewComponent,
    ProductActionComponent,
  ],
  providers: [
    {provide: TABLE_PRODUCT, useValue: 'clothes'},
    {provide: TABLE_ATTRIBUTE, useValue: 'attribute'},
    {provide: TABLE_CATEGORY, useValue: 'category'},
    {provide: TABLE_COMMENT, useValue: 'comment'},
    {provide: TABLE_CMS, useValue: 'cms'},
    {provide: TABLE_CMS_DETAIL, useValue: 'cms-detail'},
    {provide: TABLE_MEDIA, useValue: 'media'},
    {provide: TABLE_OFFER, useValue: 'offer'},
    {provide: TABLE_POST, useValue: 'post'},
    {provide: TABLE_PARTNER, useValue: 'partner'},
    {provide: TABLE_SELECTION, useValue: 'selection'},
    {provide: TABLE_SCORE, useValue: 'scores'},
    {provide: CmsService, useClass: CmsService, deps: [ AngularFirestore, TABLE_CMS ]},
    {provide: CmsDetailService, useClass: CmsDetailService, deps: [ AngularFirestore, TABLE_CMS_DETAIL ]},
    {provide: AttributeService, useClass: AttributeService, deps: [ AngularFirestore, TABLE_ATTRIBUTE ]},
    {provide: CommentService, useClass: CommentService, deps: [ AngularFirestore, TABLE_COMMENT ]},
    {provide: MediaService, useClass: MediaService, deps: [ AngularFirestore, TABLE_MEDIA ]},
    {provide: OfferService, useClass: OfferService, deps: [ AngularFirestore, TABLE_OFFER ]},
    {provide: PartnerService, useClass: PartnerService, deps: [ AngularFirestore, TABLE_PARTNER ]},
    {provide: ProductService, useClass: ProductService, deps: [ AngularFirestore, TABLE_PRODUCT ]},
    {provide: SelectionService, useClass: SelectionService, deps: [ AngularFirestore, TABLE_SELECTION ]},
    UserService,
    AlertService,
    MenuService,
    ObjectService,
    DateService,
    LoaderService,
    ScoreService,
    SidenavService,
    UserGuard,
    I18nService,
    DeviceService,
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
        {provide: cloudinary, useValue: config.cloudinary}
      ]
    };
  }
}
