import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
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
  MatTooltipModule, MatProgressBarModule
} from '@angular/material';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavService } from './../sidenav.service';
import { SidenavComponent } from './sidenav.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { MenuComponent } from '../../../shared/menu/menu.component';
import { AdsenseModule, AdsenseConfig } from 'ng2-adsense';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { UserService } from '../../user/user.service';
import { I18nService } from '../../../shared/i18n/i18n.service';
import { MockUserService } from '../../user/mock-user.service';
import { LoaderService } from '../../../shared/loader/loader.service';
import { MockLoaderService } from '../../../shared/loader/mock-loader.service';
import { environment } from '../../../environments/environment.hockey';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MenuService } from '../../../shared/menu/menu.service';
import { ProductService } from '../../../shared/product/product.service';
import { MockProductService } from '../../../shared/product/mock-product.service';
import { FacetModule } from './../../facet/facet.module';
import { FilterModule } from './../../facet/filter/filter.module';
import { SortModule } from './../../facet/sort/sort.module';
import { MockCmsDetailService } from '../../admin/shared/cms-detail/mock-cms-detail.service';
import { CmsService } from '../../admin/shared/cms/cms.service';
import { MockCmsService } from '../../admin/shared/cms/mock-cms.service';
import { CmsDetailService } from '../../admin/shared/cms-detail/cms-detail.service';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

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
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AdsenseModule.forRoot(options),
        FilterModule,
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
        MatProgressBarModule,
        MatLineModule,
        MatMenuModule,
        MatCommonModule,
        MatTooltipModule,
        Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ], {
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
      declarations: [ SidenavComponent, LoaderComponent, FooterComponent, MenuComponent ],
      providers: [
        {provide: UserService, useClass: MockUserService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: ProductService, useClass: MockProductService},
        I18nService,
        MenuService,
        SidenavService,
        {provide: CmsService, useClass: MockCmsService},
        {provide: CmsDetailService, useClass: MockCmsDetailService}
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
