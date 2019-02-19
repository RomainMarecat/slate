import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CategoryModule } from '../category/category.module';
import { HeaderModule } from '../header/header.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { MockLocalizeRouterService } from '../../../shared/router/mock-localize-router.service';
import { configureTestSuite } from '../../../shared/unit-test/configure-test-suite';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuModule } from '../../../shared/menu/menu.module';
import { CategoryService } from '../../../shared/category/category.service';
import { MockCategoryService } from '../../../shared/category/mock-category.service';
import { MediaService } from '../../../shared/media/media.service';
import { MockMediaService } from '../../../shared/media/mock-media.service';
import { StorageModule } from '../../../shared/media/storage/storage.module';
import { AngularFireStorage } from '@angular/fire/storage';
import { MockAngularFireStorage } from '../../../shared/media/shared/mock-angular-fire-storage';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
      ],
      imports: [
        CategoryModule,
        HeaderModule,
        MenuModule,
        StorageModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: AngularFireStorage, useClass: MockAngularFireStorage}
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
