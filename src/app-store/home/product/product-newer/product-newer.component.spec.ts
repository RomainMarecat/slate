import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNewerComponent } from './product-newer.component';
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
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductItemComponent } from '../product-item/product-item.component';
import { configureTestSuite } from '../../../../shared/unit-test/configure-test-suite';
import { MatIconModule, MatTooltipModule } from '@angular/material';

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
        {provide: AngularFireStorage, useClass: MockAngularFireStorage}
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
