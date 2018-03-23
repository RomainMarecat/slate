import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatGridListModule, MatIconModule, MatInputModule,
  MatListModule
} from '@angular/material';
import { Angulartics2Module } from 'angulartics2';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CloudinaryModule } from '../../../shared/cloudinary/cloudinary.module';
import { CommonModule } from '@angular/common';
import { NgPipesModule } from 'ngx-pipes';
import { environment } from '../../../environments/environment.hockey';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Cloudinary } from 'cloudinary-core';
import { SharedModule } from '../../../shared/shared.module';
import { MockSelectionService } from '../../../shared/selection/mock-selection.service';
import { MockScoreService } from '../../../shared/score/mock-score.service';
import { ProductService } from '../../../shared/product/product.service';
import { MockUserService } from '../../../shared/user/mock-user.service';
import { LoaderService } from '../../../shared/loader/loader.service';
import { DateService } from '../../../shared/util/date.service';
import { SidenavService } from '../../../shared/sidenav/sidenav.service';
import { UserService } from '../../../shared/user/user.service';
import { ScoreService } from '../../../shared/score/score.service';
import { MockProductService } from '../../../shared/product/mock-product.service';
import { SelectionService } from '../../../shared/selection/selection.service';
import { MenuService } from '../../../shared/menu/menu.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { I18nService } from '../../../shared/i18n/i18n.service';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { MockLoaderService } from '../../../shared/loader/mock-loader.service';
import { MockAreaService } from '../../../shared/map/shared/mock-area.service';
import { AreaService } from '../../../shared/map/shared/area.service';
import { ProductItemComponent } from '../product-item/product-item.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

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
        Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ], {
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
      declarations: [ ProductListComponent, ProductItemComponent ],
      providers: [
        {provide: ProductService, useClass: MockProductService},
        {provide: SelectionService, useClass: MockSelectionService},
        {provide: AreaService, useClass: MockAreaService},
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
