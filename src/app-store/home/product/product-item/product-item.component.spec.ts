import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemComponent } from './product-item.component';
import { CategoryModule } from '../../category/category.module';
import { HeaderModule } from '../../header/header.module';
import { MenuModule } from '../../../../shared/menu/menu.module';
import { StorageModule } from '../../../../shared/media/storage/storage.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
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
        {provide: FavoriteService, useClass: MockFavoriteService},
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
