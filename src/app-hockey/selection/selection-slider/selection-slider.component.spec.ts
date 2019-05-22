import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MockSlackNotificationService, SlackNotificationService } from '@romainmarecat/ngx-slack-notification';
import { DeviceService } from '../../../shared/device/device.service';
import { I18nService } from '../../../shared/i18n/i18n.service';
import { LoaderService } from '../../../shared/loader/loader.service';
import { MockLoaderService } from '../../../shared/loader/mock-loader.service';
import { MediaService } from '../../../shared/media/media.service';
import { MockMediaService } from '../../../shared/media/mock-media.service';
import { MenuService } from '../../../shared/menu/menu.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { MockProductService } from '../../../shared/product/shared/mock-product.service';
import { ProductService } from '../../../shared/product/shared/product.service';
import { MockSelectionService } from '../../../shared/selection/mock-selection.service';
import { SelectionService } from '../../../shared/selection/selection.service';
import { SharedModule } from '../../../shared/shared.module';
import { configureTestSuite } from '../../../shared/unit-test/configure-test-suite';
import { MockUserService } from '../../../shared/user/shared/mock-user.service';
import { UserService } from '../../../shared/user/shared/user.service';
import { DateService } from '../../../shared/util/date.service';
import { ObjectService } from '../../../shared/util/object.service';

import { SelectionSliderComponent } from './selection-slider.component';

describe('SelectionSliderComponent', () => {
  let component: SelectionSliderComponent;
  let fixture: ComponentFixture<SelectionSliderComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [SelectionSliderComponent],
      providers: [
        {provide: SelectionService, useClass: MockSelectionService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: UserService, useClass: MockUserService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: ProductService, useClass: MockProductService},
        {provide: SlackNotificationService, useClass: MockSlackNotificationService},
        DateService,
        DeviceService,
        I18nService,
        MenuService,
        ObjectService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
