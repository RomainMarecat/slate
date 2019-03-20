import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNewerComponent } from './product-newer.component';
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
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductItemComponent } from '../../../../shared/product/product-item/product-item.component';
import { configureTestSuite } from '../../../../shared/unit-test/configure-test-suite';
import { MatIconModule, MatTooltipModule } from '@angular/material';
import { FavoriteService } from '../../../../shared/favorite/shared/favorite.service';
import { MockFavoriteService } from '../../../../shared/favorite/shared/mock-favorite.service';
import { UserService } from '../../../../shared/user/shared/user.service';
import { MockUserService } from '../../../../shared/user/shared/mock-user.service';
import { NgPipesModule } from 'ngx-pipes';

describe('ProductNewerComponent', () => {
  let component: ProductNewerComponent;
  let fixture: ComponentFixture<ProductNewerComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        MenuModule,
        MatIconModule,
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
        ProductNewerComponent,
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
    fixture = TestBed.createComponent(ProductNewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
