import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteItemComponent } from './favorite-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material/material.module';
import { NgPipesModule } from 'ngx-pipes';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { LoaderService } from '../../loader/loader.service';
import { MockLoaderService } from '../../loader/mock-loader.service';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { FavoriteService } from '../shared/favorite.service';
import { MockFavoriteService } from '../shared/mock-favorite.service';
import { StorageModule } from '../../media/storage/storage.module';
import { UserService } from '../../user/shared/user.service';
import { MockUserService } from '../../user/shared/mock-user.service';
import { ProductService } from '../../product/shared/product.service';
import { MockProductService } from '../../product/shared/mock-product.service';
import { LoaderModule } from '../../loader/loader.module';
import { SharedProductModule } from '../../product/shared-product.module';
import { CartService } from '../../cart/shared/cart.service';
import { MockCartService } from '../../cart/shared/mock-cart.service';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('FavoriteItemComponent', () => {
  let component: FavoriteItemComponent;
  let fixture: ComponentFixture<FavoriteItemComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteItemComponent],
      imports: [
        FlexLayoutModule,
        MaterialModule,
        LoaderModule,
        NgPipesModule,
        MatTooltipModule,
        StorageModule,
        SharedProductModule,
        RouterTestingModule,
        LocalizeRouterModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: FavoriteService, useClass: MockFavoriteService},
        {provide: UserService, useClass: MockUserService},
        {provide: CartService, useClass: MockCartService},
        {provide: ProductService, useClass: MockProductService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
