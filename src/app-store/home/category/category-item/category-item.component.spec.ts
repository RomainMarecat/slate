import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryItemComponent } from './category-item.component';
import { MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { MockLocalizeRouterService } from '../../../../shared/router/mock-localize-router.service';
import { StorageModule } from '../../../../shared/media/storage/storage.module';
import { configureTestSuite } from '../../../../shared/unit-test/configure-test-suite';
import { MediaService } from '../../../../shared/media/media.service';
import { MockMediaService } from '../../../../shared/media/mock-media.service';

describe('CategoryItemComponent', () => {
  let component: CategoryItemComponent;
  let fixture: ComponentFixture<CategoryItemComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoryItemComponent
      ],
      imports: [
        FlexLayoutModule,
        LocalizeRouterModule,
        MatIconModule,
        RouterTestingModule,
        StorageModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: MediaService, useClass: MockMediaService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
