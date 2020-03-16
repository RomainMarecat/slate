import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { NgPipesModule } from 'ngx-pipes';
import { CategoryService } from '../../../../../shared/category/category.service';
import { MockCategoryService } from '../../../../../shared/category/mock-category.service';
import { FavoriteService } from '../../../../../shared/favorite/shared/favorite.service';
import { mockFavorite } from '../../../../../shared/favorite/shared/mock-favorite';
import { MockFavoriteService } from '../../../../../shared/favorite/shared/mock-favorite.service';
import { MediaService } from '../../../../../shared/media/media.service';
import { MockMediaService } from '../../../../../shared/media/mock-media.service';
import { MockAngularFireStorage } from '../../../../../shared/media/shared/mock-angular-fire-storage';
import { StorageModule } from '../../../../../shared/media/storage/storage.module';
import { MenuModule } from '../../../../../shared/menu/menu.module';
import { ProductItemComponent } from '../../../../../shared/product/product-item/product-item.component';
import { MockLocalizeRouterService } from '../../../../../shared/router/mock-localize-router.service';
import { configureTestSuite } from '../../../../../shared/unit-test/configure-test-suite';
import { mockUser } from '../../../../../shared/user/shared/mock-user';
import { MockUserService } from '../../../../../shared/user/shared/mock-user.service';
import { UserService } from '../../../../../shared/user/shared/user.service';
import { ProductListComponent } from './product-list.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

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

  it('should add favorite', () => {
    component.setFavorite(mockUser);

    expect(component).toBeTruthy();
  });

  it('should add favorite', () => {
    component.onFavoriteAdded(mockFavorite);

    expect(component).toBeTruthy();
  });

  it('should remove favorite', () => {
    component.onFavoriteRemoved(mockFavorite);

    expect(component).toBeTruthy();
  });
});
