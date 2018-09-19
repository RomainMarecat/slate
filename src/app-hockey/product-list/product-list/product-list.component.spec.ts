import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule
} from '@angular/material';
import { NgPipesModule } from 'ngx-pipes';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './product-list.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductActionComponent } from '../product-action/product-action.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../../shared/media/cloudinary/cloudinary.module';
import { ProductService } from '../../../shared/product/product.service';
import { MockProductService } from '../../../shared/product/mock-product.service';
import { MockUserService } from '../../../shared/user/shared/mock-user.service';
import { UserService } from '../../../shared/user/shared/user.service';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { LoaderService } from '../../../shared/loader/loader.service';
import { MockLoaderService } from '../../../shared/loader/mock-loader.service';
import { ScoreService } from '../../../shared/score/score.service';
import { DateService } from '../../../shared/util/date.service';
import { MockScoreService } from '../../../shared/score/mock-score.service';
import { I18nService } from '../../../shared/i18n/i18n.service';
import { SelectionService } from '../../../shared/selection/selection.service';
import { MockSelectionService } from '../../../shared/selection/mock-selection.service';
import { MenuService } from '../../../shared/menu/menu.service';
import { SharedModule } from '../../../shared/shared.module';
import { SidenavService } from '../../../shared/sidenav/sidenav.service';
import { environment } from '../../environments/environment';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatInputModule,
        MatCheckboxModule,
        MatListModule,
        NgPipesModule,
        Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        CloudinaryModule.forRoot({Cloudinary: Cloudinary}, environment.cloudinary),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        SharedModule
      ],
      declarations: [
        ProductListComponent,
        ProductItemComponent,
        ProductActionComponent,
        ProductFilterComponent
      ],
      providers: [
        {provide: ProductService, useClass: MockProductService},
        {provide: SelectionService, useClass: MockSelectionService},
        {provide: UserService, useClass: MockUserService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: ScoreService, useClass: MockScoreService},
        {provide: DateService, useClass: DateService},
        {provide: SidenavService, useClass: SidenavService},
        I18nService,
        MenuService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
