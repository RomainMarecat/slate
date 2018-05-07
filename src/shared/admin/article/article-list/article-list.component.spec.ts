import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListComponent } from './article-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxEditorModule } from 'ngx-editor';
import { SharedModule } from '../../../shared.module';
import { ArticleService } from '../../../article/shared/article.service';
import { MockArticleService } from '../../../article/shared/mock-article.service';
import { ArticleEditComponent } from '../article-edit/article-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoaderService } from '../../../loader/loader.service';
import { AttributeService } from '../../../attribute/attribute.service';
import { I18nService } from '../../../i18n/i18n.service';
import { MockMediaService } from '../../../media/mock-media.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { NotificationService } from '../../../slack/notification.service';
import { MockProductService } from '../../shared/product/mock-product.service';
import { MediaService } from '../../../media/media.service';
import { AlertService } from '../../../popup/alert.service';
import { ObjectService } from '../../../util/object.service';
import { MockLoaderService } from '../../../loader/mock-loader.service';
import { MockNotificationService } from '../../../slack/mock-notification.service';
import { DeviceService } from '../../../device/device.service';
import { ProductService } from '../../shared/product/product.service';
import { UserService } from '../../../user/user.service';
import { MockCategoryService } from '../../../category/mock-category.service';
import { MockUserService } from '../../../user/mock-user.service';
import { CategoryService } from '../../../category/category.service';
import { DateService } from '../../../util/date.service';
import { MockAttributeService } from '../../../attribute/mock-attribute.service';
import { MenuService } from '../../../menu/menu.service';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NgxDatatableModule,
        SharedModule,
        NgxEditorModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [ ArticleListComponent, ArticleEditComponent ],
      providers: [
        {provide: ArticleService, useClass: MockArticleService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: UserService, useClass: MockUserService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: ProductService, useClass: MockProductService},
        {provide: NotificationService, useClass: MockNotificationService},
        {provide: AttributeService, useClass: MockAttributeService},
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
    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});