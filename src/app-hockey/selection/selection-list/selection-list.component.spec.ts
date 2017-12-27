import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionListComponent } from './selection-list.component';
import { SharedModule } from '../../../core/shared/shared.module';
import { SelectionItemComponent } from '../selection-item/selection-item.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LoaderService } from '../../../core/shared/loader/loader.service';
import { MediaService } from '../../../core/shared/media/media.service';
import { MockNotificationService } from '../../../core/shared/slack/mock-notification.service';
import { AlertService } from '../../../core/shared/alert/alert.service';
import { UserService } from '../../../core/shared/user/user.service';
import { I18nService } from '../../../core/shared/i18n/i18n.service';
import { MockAlertService } from '../../../core/shared/alert/mock-alert.service';
import { DateService } from '../../../core/shared/util/date.service';
import { ObjectService } from '../../../core/shared/util/object.service';
import { MockUserService } from '../../../core/shared/user/mock-user.service';
import { MockMediaService } from '../../../core/shared/media/mock-media.service';
import { MockLoaderService } from '../../../core/shared/loader/mock-loader.service';
import { DeviceService } from '../../../core/shared/device/device.service';
import { NotificationService } from '../../../core/shared/slack/notification.service';
import { MockSelectionService } from '../../../core/shared/selection/mock-selection.service';
import { ProductService } from '../../../core/shared/product/product.service';
import { MockProductService } from '../../../core/shared/product/mock-product.service';
import { SelectionService } from '../../../core/shared/selection/selection.service';
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
