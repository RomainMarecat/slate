import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MenuModule } from '../../../../../shared/menu/menu.module';
import { MatBadgeModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { NgPipesModule } from 'ngx-pipes';
import { StorageModule } from '../../../../../shared/media/storage/storage.module';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ProductItemComponent } from '../../../../../shared/product/product-item/product-item.component';
import { MockLocalizeRouterService } from '../../../../../shared/router/mock-localize-router.service';
import { CategoryService } from '../../../../../shared/category/category.service';
import { MockCategoryService } from '../../../../../shared/category/mock-category.service';
import { MediaService } from '../../../../../shared/media/media.service';
import { MockMediaService } from '../../../../../shared/media/mock-media.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MockAngularFireStorage } from '../../../../../shared/media/shared/mock-angular-fire-storage';
import { FavoriteService } from '../../../../../shared/favorite/shared/favorite.service';
import { MockFavoriteService } from '../../../../../shared/favorite/shared/mock-favorite.service';
import { UserService } from '../../../../../shared/user/shared/user.service';
import { MockUserService } from '../../../../../shared/user/shared/mock-user.service';
import { configureTestSuite } from '../../../../../shared/unit-test/configure-test-suite';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        MenuModule,
        MatIconModule,
        MatBadgeModule,
        MatTooltipModule,
        NgPipesModule,
        StorageModule,
        RouterTestingModule,
        LocalizeRouterModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
      ],
      declarations: [
        ProductListComponent,
        ProductItemComponent
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: AngularFireStorage, useClass: MockAngularFireStorage},
        {provide: FavoriteService, useClass: MockFavoriteService},
        {provide: UserService, useClass: MockUserService}
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