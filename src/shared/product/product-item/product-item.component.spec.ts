import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemComponent } from './product-item.component';
import { MenuModule } from '../../menu/menu.module';
import { StorageModule } from '../../media/storage/storage.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { CategoryService } from '../../category/category.service';
import { MockCategoryService } from '../../category/mock-category.service';
import { MediaService } from '../../media/media.service';
import { MockMediaService } from '../../media/mock-media.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MockAngularFireStorage } from '../../media/shared/mock-angular-fire-storage';
import { FavoriteService } from '../../favorite/shared/favorite.service';
import { MockFavoriteService } from '../../favorite/shared/mock-favorite.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatTooltipModule } from '@angular/material';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { CartService } from '../../cart/shared/cart.service';
import { MockCartService } from '../../cart/shared/mock-cart.service';
import { UserService } from '../../user/shared/user.service';
import { MockUserService } from '../../user/shared/mock-user.service';

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
