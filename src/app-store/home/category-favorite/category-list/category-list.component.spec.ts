import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';
import { configureTestSuite } from '../../../../shared/unit-test/configure-test-suite';
import { CategoryItemComponent } from '../../../../shared/category/category-item/category-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageModule } from '../../../../shared/media/storage/storage.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MockLocalizeRouterService } from '../../../../shared/router/mock-localize-router.service';
import { CategoryService } from '../../../../shared/category/category.service';
import { MockCategoryService } from '../../../../shared/category/mock-category.service';
import { MediaService } from '../../../../shared/media/media.service';
import { MockMediaService } from '../../../../shared/media/mock-media.service';
import { FavoriteService } from '../../../../shared/favorite/shared/favorite.service';
import { MockFavoriteService } from '../../../../shared/favorite/shared/mock-favorite.service';
import { MockUserService } from '../../../../shared/user/shared/mock-user.service';
import { UserService } from '../../../../shared/user/shared/user.service';
import { MatIconModule } from '@angular/material/icon';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoryListComponent,
        CategoryItemComponent
      ],
      imports: [
        FlexLayoutModule,
        LocalizeRouterModule,
        MatIconModule,
        RouterTestingModule,
        StorageModule,
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
        {provide: FavoriteService, useClass: MockFavoriteService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: UserService, useClass: MockUserService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
