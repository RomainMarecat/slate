import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionListComponent } from './selection-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { SelectionItemComponent } from '../selection-item/selection-item.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LoaderService } from '../../../shared/loader/loader.service';
import { MediaService } from '../../../shared/media/media.service';
import { MockNotificationService } from '../../../shared/slack/mock-notification.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { UserService } from '../../../shared/user/user.service';
import { I18nService } from '../../../shared/i18n/i18n.service';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { DateService } from '../../../shared/util/date.service';
import { ObjectService } from '../../../shared/util/object.service';
import { MockUserService } from '../../../shared/user/mock-user.service';
import { MockMediaService } from '../../../shared/media/mock-media.service';
import { MockLoaderService } from '../../../shared/loader/mock-loader.service';
import { DeviceService } from '../../../shared/device/device.service';
import { NotificationService } from '../../../shared/slack/notification.service';
import { MockSelectionService } from '../../../shared/selection/mock-selection.service';
import { ProductService } from '../../../shared/product/product.service';
import { MockProductService } from '../../../shared/product/mock-product.service';
import { SelectionService } from '../../../shared/selection/selection.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('SelectionListComponent', () => {
  let component: SelectionListComponent;
  let fixture: ComponentFixture < SelectionListComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          SharedModule,
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          }),
        ],
        declarations: [SelectionListComponent, SelectionItemComponent],
        providers: [
          { provide: SelectionService, useClass: MockSelectionService },
          { provide: AlertService, useClass: MockAlertService },
          { provide: LoaderService, useClass: MockLoaderService },
          { provide: UserService, useClass: MockUserService },
          { provide: MediaService, useClass: MockMediaService },
          { provide: ProductService, useClass: MockProductService },
          { provide: NotificationService, useClass: MockNotificationService },
          DateService,
          ObjectService,
          I18nService,
          DeviceService,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
