import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatLineModule,
  MatMenuModule,
  MatCommonModule,
  MatTooltipModule
} from '@angular/material';
import { NgcCookieConsentModule, NgcCookieConsentService, WindowService, NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConversationService } from '../../shared/chat/shared/conversation.service';
import { MockConversationService } from '../../shared/chat/shared/mock-conversation.service';
import { ContactService } from '../../shared/contact/shared/contact.service';
import { MockContactService } from '../../shared/contact/shared/mock-contact.service';
import { SidenavService } from '../../shared/sidenav/sidenav.service';
import { AdsenseModule } from 'ng2-adsense';
import { UserService } from '../../shared/user/shared/user.service';
import { I18nService } from '../../shared/i18n/i18n.service';
import { MockUserService } from '../../shared/user/shared/mock-user.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { MockLoaderService } from '../../shared/loader/mock-loader.service';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRootComponent } from './root.component';
import { SharedModule } from '../../shared/shared.module';
import { MenuService } from '../../shared/menu/menu.service';
import { ProductService } from '../../shared/product/shared/product.service';
import { MockProductService } from '../../shared/product/shared/mock-product.service';
import { AlertService } from '../../shared/popup/alert.service';
import { MockCmsDetailService } from '../../shared/cms-detail/shared/mock-cms-detail.service';
import { CmsService } from '../../shared/cms/shared/cms.service';
import { MockCmsService } from '../../shared/cms/shared/mock-cms.service';
import { MockAlertService } from '../../shared/popup/mock-alert.service';
import { CmsDetailService } from '../../shared/cms-detail/shared/cms-detail.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { configureTestSuite } from '../../shared/unit-test/configure-test-suite';
import { MockLocalizeRouterService } from '../../shared/router/mock-localize-router.service';
import { BreadcrumbModule } from '../../shared/breadcrumb/breadcrumb.module';
import { MockCategoryService } from '../../shared/category/mock-category.service';
import { CategoryService } from '../../shared/category/category.service';

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

describe('Showcase AppRootComponent', () => {
  let component: AppRootComponent;
  let fixture: ComponentFixture<AppRootComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BreadcrumbModule,
        RouterTestingModule,
        BrowserModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AdsenseModule.forRoot({
          adClient: environment.clientAdSense,
          adSlot: environment.slotAdSense
        }),
        LocalizeRouterModule,
        MatCardModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule,
        MatListModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatLineModule,
        MatMenuModule,
        MatCommonModule,
        MatTooltipModule,
        NgcCookieConsentModule.forRoot(cookieConfig),
        Angulartics2Module.forRoot({
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        SharedModule
      ],
      declarations: [
        AppRootComponent,
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: UserService, useClass: MockUserService},
        {provide: ContactService, useClass: MockContactService},
        {provide: ConversationService, useClass: MockConversationService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: NgcCookieConsentService, useClass: NgcCookieConsentService},
        {provide: WindowService, useClass: WindowService},
        {provide: ProductService, useClass: MockProductService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: CmsDetailService, useClass: MockCmsDetailService},
        {provide: CmsService, useClass: MockCmsService},
        I18nService,
        MenuService,
        SidenavService,
        Angulartics2GoogleAnalytics
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
