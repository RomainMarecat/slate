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

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [ HomeComponent],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: AreaService, useClass: MockAreaService},
        {provide: MapService, useClass: MockMapService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: ProductService, useClass: MockProductService},
        DateService,
        DeviceService,
        I18nService,
        MenuService,
        ObjectService,
        {provide: SelectionService, useClass: MockSelectionService}

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
