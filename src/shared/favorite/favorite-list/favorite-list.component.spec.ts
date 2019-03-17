import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteListComponent } from './favorite-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaderModule } from '../../loader/loader.module';
import { MaterialModule } from '../../material/material.module';
import { NgPipesModule } from 'ngx-pipes';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { FavoriteItemComponent } from '../favorite-item/favorite-item.component';
import { StorageModule } from '../../media/storage/storage.module';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { LoaderService } from '../../loader/loader.service';
import { MockLoaderService } from '../../loader/mock-loader.service';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { FavoriteService } from '../shared/favorite.service';
import { MockFavoriteService } from '../shared/mock-favorite.service';
import { UserService } from '../../user/shared/user.service';
import { MockUserService } from '../../user/shared/mock-user.service';
import { ProductService } from '../../product/shared/product.service';
import { MockProductService } from '../../product/shared/mock-product.service';
import { PopupModule } from '../../popup/popup.module';

describe('FavoriteListComponent', () => {
  let component: FavoriteListComponent;
  let fixture: ComponentFixture<FavoriteListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FavoriteListComponent,
        FavoriteItemComponent
      ],
      imports: [
        FlexLayoutModule,
        LoaderModule,
        MaterialModule,
        PopupModule,
        NgPipesModule,
        StorageModule,
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
        {provide: ProductService, useClass: MockProductService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
