import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { AdsenseModule } from 'ng2-adsense';
import { NgcCookieConsentModule, NgcCookieConsentService } from 'ngx-cookieconsent';
import { BreadcrumbModule } from '../../shared/breadcrumb/breadcrumb.module';
import { CategoryService } from '../../shared/category/category.service';
import { MockCategoryService } from '../../shared/category/mock-category.service';
import { CmsDetailService } from '../../shared/cms-detail/shared/cms-detail.service';
import { MockCmsDetailService } from '../../shared/cms-detail/shared/mock-cms-detail.service';
import { CmsService } from '../../shared/cms/shared/cms.service';
import { MockCmsService } from '../../shared/cms/shared/mock-cms.service';
import { FavoriteService } from '../../shared/favorite/shared/favorite.service';
import { MockFavoriteService } from '../../shared/favorite/shared/mock-favorite.service';
import { FooterModule } from '../../shared/footer/footer.module';
import { I18nService } from '../../shared/i18n/i18n.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { MockLoaderService } from '../../shared/loader/mock-loader.service';
import { MaterialModule } from '../../shared/material/material.module';
import { MenuModule } from '../../shared/menu/menu.module';
import { MenuService } from '../../shared/menu/menu.service';
import { AlertService } from '../../shared/popup/alert.service';
import { MockAlertService } from '../../shared/popup/mock-alert.service';
import { MockProductService } from '../../shared/product/shared/mock-product.service';
import { ProductService } from '../../shared/product/shared/product.service';
import { MockLocalizeRouterService } from '../../shared/router/mock-localize-router.service';
import { SidenavService } from '../../shared/sidenav/sidenav.service';
import { configureTestSuite } from '../../shared/unit-test/configure-test-suite';
import { MockUserService } from '../../shared/user/shared/mock-user.service';
import { UserService } from '../../shared/user/shared/user.service';
import { environment } from '../environments/environment';
import { CategoryFavoriteModule } from '../home/category-favorite/category-favorite.module';
import { CategoryModule } from '../home/category/category.module';
import { HeaderModule } from '../home/header/header.module';
import { HomeComponent } from '../home/home/home.component';
import { ProductModule } from '../home/product/product.module';
import { cookieConfig } from './core.module';
import { AppRootComponent } from './root.component';

describe('Store AppRootComponent', () => {
  let component: AppRootComponent;
  let fixture: ComponentFixture<AppRootComponent>;
  let router: Router;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AdsenseModule.forRoot({
          adClient: environment.clientAdSense,
          adSlot: environment.slotAdSense
        }),
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        Angulartics2Module.forRoot({
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        BreadcrumbModule,
        CategoryModule,
        CategoryFavoriteModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FooterModule,
        HeaderModule,
        LocalizeRouterModule,
        HttpClientTestingModule,
        MaterialModule,
        MenuModule,
        NgcCookieConsentModule.forRoot(cookieConfig),
        ProductModule,
        RouterTestingModule.withRoutes([
          {path: '', component: HomeComponent}
        ]),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [
        AppRootComponent,
        HomeComponent
      ],
      providers: [
        {provide: UserService, useClass: MockUserService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: ProductService, useClass: MockProductService},
        {provide: UserService, useClass: MockUserService},
        {provide: FavoriteService, useClass: MockFavoriteService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: CmsDetailService, useClass: MockCmsDetailService},
        {provide: CmsService, useClass: MockCmsService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        I18nService,
        MenuService,
        SidenavService,
        Angulartics2GoogleAnalytics,
        NgcCookieConsentService,
        {provide: FirestoreSettingsToken, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRootComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start analytics', () => {
    component.startAnalytics();
    expect(component).toBeTruthy();
  });
});
