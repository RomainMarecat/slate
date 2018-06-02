import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionListComponent } from './selection-list.component';
import { SharedModule } from '../../../../shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { LoaderService } from '../../../../loader/loader.service';
import { MediaService } from '../../../../media/media.service';
import { MockNotificationService } from '../../../../slack/mock-notification.service';
import { AlertService } from '../../../../popup/alert.service';
import { UserService } from '../../../../user/user.service';
import { I18nService } from '../../../../i18n/i18n.service';
import { MockAlertService } from '../../../../popup/mock-alert.service';
import { DateService } from '../../../../util/date.service';
import { ObjectService } from '../../../../util/object.service';
import { MockUserService } from '../../../../user/mock-user.service';
import { MockMediaService } from '../../../../media/mock-media.service';
import { MockLoaderService } from '../../../../loader/mock-loader.service';
import { DeviceService } from '../../../../device/device.service';
import { MenuService } from '../../../../menu/menu.service';
import { NotificationService } from '../../../../slack/notification.service';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Angulartics2Module } from 'angulartics2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectionService } from '../../../../selection/selection.service';
import { MockSelectionService } from '../../../../selection/mock-selection.service';
import { ProductService } from '../../../../product/product.service';
import { MockProductService } from '../../../../product/mock-product.service';

describe('SelectionListComponent', () => {
  let component: SelectionListComponent;
  let fixture: ComponentFixture<SelectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ], {
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule,
        NgxDatatableModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [ SelectionListComponent ],
      providers: [
        {provide: SelectionService, useClass: MockSelectionService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: UserService, useClass: MockUserService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: ProductService, useClass: MockProductService},
        {provide: NotificationService, useClass: MockNotificationService},
        DateService,
        ObjectService,
        I18nService,
        MenuService,
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
