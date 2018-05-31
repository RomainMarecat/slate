import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../../../../shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxEditorModule } from 'ngx-editor';
import { MockSelectionService } from '../../../shared/navigation/selection/mock-selection.service';
import { SelectionService } from '../../../shared/navigation/selection/selection.service';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AlertService } from '../../../../popup/alert.service';
import { MockAlertService } from '../../../../popup/mock-alert.service';
import { LoaderService } from '../../../../loader/loader.service';
import { MediaService } from '../../../../media/media.service';
import { MockNotificationService } from '../../../../slack/mock-notification.service';
import { UserService } from '../../../../user/user.service';
import { I18nService } from '../../../../i18n/i18n.service';
import { MockProductService } from '../../../shared/product/mock-product.service';
import { DateService } from '../../../../util/date.service';
import { ObjectService } from '../../../../util/object.service';
import { MockUserService } from '../../../../user/mock-user.service';
import { MockMediaService } from '../../../../media/mock-media.service';
import { MockLoaderService } from '../../../../loader/mock-loader.service';
import { ProductService } from '../../../shared/product/product.service';
import { DeviceService } from '../../../../device/device.service';
import { NotificationService } from '../../../../slack/notification.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Angulartics2Module } from 'angulartics2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SelectionEditComponent } from './selection-edit.component';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../../../media/cloudinary/cloudinary.module';
import { environment } from '../../../../../app-hockey/environments/environment';

describe('SelectionEditComponent', () => {
  let component: SelectionEditComponent;
  let fixture: ComponentFixture<SelectionEditComponent>;

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
        NgxEditorModule,
        CloudinaryModule.forRoot({Cloudinary: Cloudinary}, environment.cloudinary),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        RouterTestingModule
      ],
      declarations: [ SelectionEditComponent ],
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
        DeviceService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
