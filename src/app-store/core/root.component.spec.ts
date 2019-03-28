import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
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
import { MenuService } from '../../shared/menu/menu.service';
import { ProductService } from '../../shared/product/shared/product.service';
import { MockProductService } from '../../shared/product/shared/mock-product.service';
import { MockAlertService } from '../../shared/popup/mock-alert.service';
import { AlertService } from '../../shared/popup/alert.service';
import { CmsDetailService } from '../../shared/cms-detail/shared/cms-detail.service';
import { MockCmsDetailService } from '../../shared/cms-detail/shared/mock-cms-detail.service';
import { CmsService } from '../../shared/cms/shared/cms.service';
import { MockCmsService } from '../../shared/cms/shared/mock-cms.service';
import { environment } from '../environments/environment';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../../shared/router/mock-localize-router.service';
import { MenuModule } from '../../shared/menu/menu.module';
import { configureTestSuite } from '../../shared/unit-test/configure-test-suite';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { HomeComponent } from '../home/home/home.component';
import { HeaderModule } from '../home/header/header.module';
import { CategoryModule } from '../home/category/category.module';
import { CategoryService } from '../../shared/category/category.service';
import { MockCategoryService } from '../../shared/category/mock-category.service';
import { NgcCookieConsentModule, NgcCookieConsentService } from 'ngx-cookieconsent';
import { cookieConfig } from './core.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../../shared/material/material.module';
import { FavoriteService } from '../../shared/favorite/shared/favorite.service';
import { MockFavoriteService } from '../../shared/favorite/shared/mock-favorite.service';
import { CategoryFavoriteModule } from '../home/category-favorite/category-favorite.module';
import { ProductModule } from '../home/product/product.module';
import { Observable, of } from 'rxjs';
import { Event, NavigationEnd, Router } from '@angular/router';


// export class RouterStub {
//   get events(): Observable<Event> {
//     return of(new NavigationEnd(1, '', ''));
//   }
//
//   routerState: {
//     snapshot: {
//       url: string;
//     }
//   } = {
//     snapshot: {
//       url: ''
//     }
//   };
//   createUrlTree: {};
//   navigate: () => {};
//   navigateByUrl: () => {};
// }

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
        CategoryModule,
        CategoryFavoriteModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
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
