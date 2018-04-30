import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MockLoaderService } from '../../shared/loader/mock-loader.service';
import { MockProductService } from '../../shared/product/mock-product.service';
import { MockAlertService } from '../../shared/popup/mock-alert.service';
import { ObjectService } from '../../shared/util/object.service';
import { DateService } from '../../shared/util/date.service';
import { DeviceService } from '../../shared/device/device.service';
import { AlertService } from '../../shared/popup/alert.service';
import { ProductService } from '../../shared/product/product.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { MenuService } from '../../shared/menu/menu.service';
import { SelectionService } from '../../shared/selection/selection.service';
import { MockSelectionService } from '../../shared/selection/mock-selection.service';
import { I18nService } from '../../shared/i18n/i18n.service';
import { MockAreaService } from '../../shared/map/shared/mock-area.service';
import { AreaService } from '../../shared/map/shared/area.service';
import { MockMapService } from '../../shared/map/shared/mock-map.service';
import { MapService } from '../../shared/map/shared/map.service';
import { CategoryService } from '../../shared/category/category.service';
import { MockCategoryService } from '../../shared/category/mock-category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule,
  MatInputModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        SharedModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [ HomeComponent ],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: AreaService, useClass: MockAreaService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: MapService, useClass: MockMapService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: ProductService, useClass: MockProductService},
        {provide: SelectionService, useClass: MockSelectionService},
        DateService,
        DeviceService,
        I18nService,
        MenuService,
        ObjectService

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});