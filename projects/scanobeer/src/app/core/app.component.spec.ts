import { async, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { CategoryService } from '../../../../../src/shared/category/category.service';
import { MockCategoryService } from '../../../../../src/shared/category/mock-category.service';
import { CmsDetailService } from '../../../../../src/shared/cms-detail/shared/cms-detail.service';
import { MockCmsDetailService } from '../../../../../src/shared/cms-detail/shared/mock-cms-detail.service';
import { CmsService } from '../../../../../src/shared/cms/shared/cms.service';
import { MockCmsService } from '../../../../../src/shared/cms/shared/mock-cms.service';
import { PopupModule } from '../../../../../src/shared/popup/popup.module';
import { MockProductService } from '../../../../../src/shared/product/shared/mock-product.service';
import { ProductService } from '../../../../../src/shared/product/shared/product.service';
import { MockLocalizeRouterService } from '../../../../../src/shared/router/mock-localize-router.service';
import { SidenavModule } from '../../../../../src/shared/sidenav/sidenav.module';
import { environment } from '../../environments/environment';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        Angulartics2Module.forRoot({
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule.enablePersistence(),
        NoopAnimationsModule,
        PopupModule,
        RouterTestingModule,
        SidenavModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        LocalizeRouterModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: ProductService, useClass: MockProductService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: CmsService, useClass: MockCmsService},
        {provide: CmsDetailService, useClass: MockCmsDetailService},
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
