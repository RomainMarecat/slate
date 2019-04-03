import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatCommonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatLineModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavService } from '../sidenav.service';
import { SidenavComponent } from './sidenav.component';
import { FooterComponent } from '../../footer/footer.component';
import { MenuComponent } from '../../menu/menu.component';
import { AdsenseModule } from 'ng2-adsense';
import { LoaderComponent } from '../../loader/loader.component';
import { UserService } from '../../user/shared/user.service';
import { I18nService } from '../../i18n/i18n.service';
import { MockUserService } from '../../user/shared/mock-user.service';
import { LoaderService } from '../../loader/loader.service';
import { MockLoaderService } from '../../loader/mock-loader.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MenuService } from '../../menu/menu.service';
import { ProductService } from '../../product/shared/product.service';
import { MockProductService } from '../../product/shared/mock-product.service';
import { FilterModule } from '../../facet/filter/filter.module';
import { SortModule } from '../../facet/sort/sort.module';
import { MockCmsDetailService } from '../../cms-detail/shared/mock-cms-detail.service';
import { CmsService } from '../../cms/shared/cms.service';
import { MockCmsService } from '../../cms/shared/mock-cms.service';
import { CmsDetailService } from '../../cms-detail/shared/cms-detail.service';
import { environment } from '../../../app-hockey/environments/environment';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { CategoryService } from '../../category/category.service';
import { MockCategoryService } from '../../category/mock-category.service';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    const options = {
      adClient: 'ca-pub-334543',
      adSlot: 2930227358,
      layout: 'z1',
    };
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule,
        BrowserModule,
        BreadcrumbModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AdsenseModule.forRoot(options),
        FilterModule,
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
        MatDialogModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatLineModule,
        MatMenuModule,
        MatCommonModule,
        MatTooltipModule,
        Angulartics2Module.forRoot({
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        SortModule
      ],
      declarations: [SidenavComponent, LoaderComponent, FooterComponent, MenuComponent],
      providers: [
        {provide: UserService, useClass: MockUserService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: ProductService, useClass: MockProductService},
        {provide: CategoryService, useClass: MockCategoryService},
        I18nService,
        MenuService,
        SidenavService,
        {provide: CmsService, useClass: MockCmsService},
        {provide: CmsDetailService, useClass: MockCmsDetailService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
