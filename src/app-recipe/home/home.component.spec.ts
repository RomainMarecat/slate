import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockMatIconComponent } from '../../shared/mock/mock-mat-icon.component';

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AlertService } from '../../shared/popup/alert.service';
import { MockAlertService } from '../../shared/popup/mock-alert.service';
import { RecipeService } from '../recipe/shared/recipe.service';
import { MockRecipeService } from '../recipe/shared/mock-recipe.service';
import { SeoService } from '../../shared/seo/shared/seo.service';
import { MockLocalizeRouterService } from '../../shared/router/mock-localize-router.service';
import { ReactiveFormsModule } from '@angular/forms';
import { configureTestSuite } from '../../shared/unit-test/configure-test-suite';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SeoModule } from '../../shared/seo/seo.module';
import { RecipeSharedListModule } from '../recipe-list/recipe-list/recipe-shared-list.module';
import { MenuService } from '../../shared/menu/menu.service';
import { MockMediaService } from '../../shared/media/mock-media.service';
import { MediaService } from '../../shared/media/media.service';
import { MediaModule } from '../../shared/media/media.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

describe('Recipe HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        LocalizeRouterModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MediaModule,
        SeoModule,
        RecipeSharedListModule,
        MatCardModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [HomeComponent],
      providers: [
        MenuService,
        {provide: AlertService, useClass: MockAlertService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: RecipeService, useClass: MockRecipeService},
        {provide: SeoService, useClass: SeoService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService}
      ]
    })
      .overrideModule(MatIconModule, {
        remove: {
          declarations: [MatIcon],
          exports: [MatIcon]
        },
        add: {
          declarations: [MockMatIconComponent],
          exports: [MockMatIconComponent]
        }
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
