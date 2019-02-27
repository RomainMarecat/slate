import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CategoryModule } from '../category/category.module';
import { HeaderModule } from '../header/header.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { MockLocalizeRouterService } from '../../../shared/router/mock-localize-router.service';
import { configureTestSuite } from '../../../shared/unit-test/configure-test-suite';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuModule } from '../../../shared/menu/menu.module';
import { CategoryService } from '../../../shared/category/category.service';
import { MockCategoryService } from '../../../shared/category/mock-category.service';
import { MediaService } from '../../../shared/media/media.service';
import { MockMediaService } from '../../../shared/media/mock-media.service';
import { StorageModule } from '../../../shared/media/storage/storage.module';
import { AngularFireStorage } from '@angular/fire/storage';
import { MockAngularFireStorage } from '../../../shared/media/shared/mock-angular-fire-storage';
import { ProductModule } from '../product/product.module';
import { ProductService } from '../../../shared/product/shared/product.service';
import { MockProductService } from '../../../shared/product/shared/mock-product.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { UserService } from '../../../shared/user/shared/user.service';
import { MockUserService } from '../../../shared/user/shared/mock-user.service';
import { FavoriteService } from '../../../shared/favorite/shared/favorite.service';
import { MockFavoriteService } from '../../../shared/favorite/shared/mock-favorite.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
      ],
      imports: [
        CategoryModule,
        HeaderModule,
        MenuModule,
        ProductModule,
        RouterTestingModule,
        StorageModule,
        LocalizeRouterModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
      ],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: UserService, useClass: MockUserService},
        {provide: FavoriteService, useClass: MockFavoriteService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: ProductService, useClass: MockProductService},
        {provide: AngularFireStorage, useClass: MockAngularFireStorage}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
