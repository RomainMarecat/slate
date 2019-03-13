import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemComponent } from './product-item.component';
import { MenuModule } from '../../../../shared/menu/menu.module';
import { StorageModule } from '../../../../shared/media/storage/storage.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../../../../shared/router/mock-localize-router.service';
import { CategoryService } from '../../../../shared/category/category.service';
import { MockCategoryService } from '../../../../shared/category/mock-category.service';
import { MediaService } from '../../../../shared/media/media.service';
import { MockMediaService } from '../../../../shared/media/mock-media.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MockAngularFireStorage } from '../../../../shared/media/shared/mock-angular-fire-storage';
import { FavoriteService } from '../../../../shared/favorite/shared/favorite.service';
import { MockFavoriteService } from '../../../../shared/favorite/shared/mock-favorite.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatTooltipModule } from '@angular/material';
import { configureTestSuite } from '../../../../shared/unit-test/configure-test-suite';
import { AlertService } from '../../../../shared/popup/alert.service';
import { MockAlertService } from '../../../../shared/popup/mock-alert.service';
import { CartService } from '../../../../shared/cart/shared/cart.service';
import { MockCartService } from '../../../../shared/cart/shared/mock-cart.service';
import { UserService } from '../../../../shared/user/shared/user.service';
import { MockUserService } from '../../../../shared/user/shared/mock-user.service';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        MenuModule,
        MatIconModule,
        MatTooltipModule,
        StorageModule,
        LocalizeRouterModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: UserService, useClass: MockUserService},
        {provide: FavoriteService, useClass: MockFavoriteService},
        {provide: CartService, useClass: MockCartService},
        {provide: AngularFireStorage, useClass: MockAngularFireStorage}
      ],
      declarations: [ProductItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
