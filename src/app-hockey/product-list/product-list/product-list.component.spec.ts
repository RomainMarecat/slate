import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { Cloudinary } from 'cloudinary-core';
import { NgPipesModule } from 'ngx-pipes';
import { I18nService } from '../../../shared/i18n/i18n.service';
import { LoaderService } from '../../../shared/loader/loader.service';
import { MockLoaderService } from '../../../shared/loader/mock-loader.service';
import { CloudinaryModule } from '../../../shared/media/cloudinary/cloudinary.module';
import { MenuService } from '../../../shared/menu/menu.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { MockProductService } from '../../../shared/product/shared/mock-product.service';
import { ProductService } from '../../../shared/product/shared/product.service';
import { MockScoreService } from '../../../shared/score/mock-score.service';
import { ScoreService } from '../../../shared/score/score.service';
import { MockSelectionService } from '../../../shared/selection/mock-selection.service';
import { SelectionService } from '../../../shared/selection/selection.service';
import { SharedModule } from '../../../shared/shared.module';
import { SidenavService } from '../../../shared/sidenav/sidenav.service';
import { configureTestSuite } from '../../../shared/unit-test/configure-test-suite';
import { MockUserService } from '../../../shared/user/shared/mock-user.service';
import { UserService } from '../../../shared/user/shared/user.service';
import { DateService } from '../../../shared/util/date.service';
import { environment } from '../../environments/environment';
import { ProductActionComponent } from '../product-action/product-action.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductListComponent } from './product-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
        Angulartics2Module.forRoot( {
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        CloudinaryModule.forRoot({Cloudinary}, environment.cloudinary),
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
