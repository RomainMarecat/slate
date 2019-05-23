import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatModule } from '../../../chat/chat.module';
import { ConversationService } from '../../../chat/shared/conversation.service';
import { MockConversationService } from '../../../chat/shared/mock-conversation.service';

import { ContactListComponent } from './contact-list.component';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../../shared.module';
import { NgxEditorModule } from 'ngx-editor';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { LoaderService } from '../../../loader/loader.service';
import { UserService } from '../../../user/shared/user.service';
import { MockLoaderService } from '../../../loader/mock-loader.service';
import { MockUserService } from '../../../user/shared/mock-user.service';
import { MediaService } from '../../../media/media.service';
import { MockMediaService } from '../../../media/mock-media.service';
import { CategoryService } from '../../../category/category.service';
import { MockCategoryService } from '../../../category/mock-category.service';
import { ProductService } from '../../../product/shared/product.service';
import { MockProductService } from '../../../product/shared/mock-product.service';
import { SlackNotificationService } from '@romainmarecat/ngx-slack-notification';
import { MockSlackNotificationService } from '@romainmarecat/ngx-slack-notification';
import { AttributeService } from '../../../attribute/attribute.service';
import { MockAttributeService } from '../../../attribute/mock-attribute.service';
import { DateService } from '../../../util/date.service';
import { MenuService } from '../../../menu/menu.service';
import { ObjectService } from '../../../util/object.service';
import { I18nService } from '../../../i18n/i18n.service';
import { DeviceService } from '../../../device/device.service';
import { ContactService } from '../../../contact/shared/contact.service';
import { MockContactService } from '../../../contact/shared/mock-contact.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../../../router/mock-localize-router.service';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NgxDatatableModule,
        SharedModule,
        ChatModule,
        NgxEditorModule,
        HttpClientTestingModule,
        LocalizeRouterModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [
        ContactListComponent,
        ContactDetailComponent
      ],
      providers: [
        {provide: ContactService, useClass: MockContactService},
        {provide: ConversationService, useClass: MockConversationService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: UserService, useClass: MockUserService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: ProductService, useClass: MockProductService},
        {provide: SlackNotificationService, useClass: MockSlackNotificationService},
        {provide: AttributeService, useClass: MockAttributeService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        DateService,
        MenuService,
        ObjectService,
        I18nService,
        DeviceService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
