import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';
import { CategoryItemComponent } from '../../../../shared/category/category-item/category-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material';
import { StorageModule } from '../../../../shared/media/storage/storage.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../../../../shared/router/mock-localize-router.service';
import { configureTestSuite } from '../../../../shared/unit-test/configure-test-suite';
import { CategoryService } from '../../../../shared/category/category.service';
import { MockCategoryService } from '../../../../shared/category/mock-category.service';
import { MediaService } from '../../../../shared/media/media.service';
import { MockMediaService } from '../../../../shared/media/mock-media.service';

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
        {provide: MediaService, useClass: MockMediaService},
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
