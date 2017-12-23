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

import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { UserService } from '../../core/shared/user/user.service';
import { AlertService } from '../../core/shared/alert/alert.service';
import { ObjectService } from '../../core/shared/util/object.service';
import { DateService } from '../../core/shared/util/date.service';
import { LoaderService } from '../../core/shared/loader/loader.service';
import { ScoreService } from '../../core/shared/score/score.service';
import { SidenavService } from '../../core/shared/sidenav/sidenav.service';
import { UserGuard } from '../../core/shared/guard/user.guard';
import { I18nService } from '../../core/shared/i18n/i18n.service';
import { DeviceService } from '../../core/shared/device/device.service';
import CloudinaryConfiguration from '../../core/shared/cloudinary/cloudinary-configuration.class';
import { FirebaseAppConfig } from 'angularfire2';
import { Environment } from '../../core/shared/util/environment';
import { ProductService } from '../../core/shared/product/product.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { MediaService } from '../../core/shared/media/media.service';
import { CloudinaryModule } from '../../core/shared/cloudinary/cloudinary.module';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductFormComponent } from '../product-add/product-form/product-form.component';
import { ProductActionComponent } from '../product-item/product-action/product-action.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductPreviewComponent } from '../product-add/product-preview/product-preview.component';
import { SharedModule } from '../../core/shared/shared.module';
import { environment } from '../../environments/environment.monpullmoche';
import { SlackModule } from '../../core/shared/slack/slack.module';

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

@Injectable()
export class ConfigService {
  configToken: Environment;
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
    CloudinaryModule.forRoot({ Cloudinary: CloudinaryCore },
      environment.cloudinary
    ),
    SharedModule.forRoot(CONFIG_TOKEN),
    SlackModule.forRoot(slackToken),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient, app_name]
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
    { provide: ConfigService, useClass: ConfigService, deps: [CONFIG_TOKEN] },
    { provide: ProductService, useClass: ProductService, deps: [AngularFirestore, app_name] },
    { provide: MediaService, useClass: MediaService, deps: [AngularFirestore, app_name] },
    UserService,
    AlertService,
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
        /*
        Problem with cyclic provider    { provide: config, useExisting: config },
         */
        { provide: production, useValue: config.production },
        { provide: site_name, useValue: config.site_name },
        { provide: app_name, useValue: config.app_name },
        { provide: firebase, useValue: config.firebase },
        { provide: cloudinary, useValue: config.cloudinary }
      ]
    };
  }
}