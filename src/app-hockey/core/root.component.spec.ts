import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgcCookieConsentConfig, NgcCookieConsentModule, NgcCookieConsentService, WindowService } from 'ngx-cookieconsent';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavService } from '../../shared/sidenav/sidenav.service';
import { AdsenseModule } from 'ng2-adsense';
import { UserService } from '../../shared/user/shared/user.service';
import { I18nService } from '../../shared/i18n/i18n.service';
import { MockUserService } from '../../shared/user/shared/mock-user.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { MockLoaderService } from '../../shared/loader/mock-loader.service';
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
import { environment } from '../environments/environment';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../../shared/router/mock-localize-router.service';
import { configureTestSuite } from '../../shared/unit-test/configure-test-suite';
import { MockCategoryService } from '../../shared/category/mock-category.service';
import { CategoryService } from '../../shared/category/category.service';
import { BreadcrumbModule } from '../../shared/breadcrumb/breadcrumb.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCommonModule, MatLineModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

export const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.site_name
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

describe('Hockey AppRootComponent', () => {
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
        HttpClientModule,
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
