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
import { NotificationService } from '../../shared/slack/notification.service';
import { MockNotificationService } from '../../shared/slack/mock-notification.service';
import { AlertService } from '../../shared/popup/alert.service';
import { UserService } from '../../shared/user/user.service';
import { MediaService } from '../../shared/media/media.service';
import { MockMediaService } from '../../shared/media/mock-media.service';
import { ProductService } from '../../shared/product/product.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { MockUserService } from '../../shared/user/mock-user.service';
import { MenuService } from '../../shared/menu/menu.service';
import { SelectionService } from '../../shared/selection/selection.service';
import { MockSelectionService } from '../../shared/selection/mock-selection.service';
import { I18nService } from '../../shared/i18n/i18n.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
      ],
      declarations: [ HomeComponent ],
      providers: [
        { provide: SelectionService, useClass: MockSelectionService },
        { provide: AlertService, useClass: MockAlertService },
        { provide: LoaderService, useClass: MockLoaderService },
        { provide: UserService, useClass: MockUserService },
        { provide: MediaService, useClass: MockMediaService },
        { provide: ProductService, useClass: MockProductService },
        { provide: NotificationService, useClass: MockNotificationService },
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
