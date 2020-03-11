import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListComponent } from './recipe-list.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RecipeService } from '../../recipe/shared/recipe.service';
import { MockRecipeService } from '../../recipe/shared/mock-recipe.service';
import { configureTestSuite } from '../../../shared/unit-test/configure-test-suite';
import { SeoModule } from '../../../shared/seo/seo.module';
import { AlertService } from '../../../shared/popup/alert.service';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { MockLocalizeRouterService } from '../../../shared/router/mock-localize-router.service';
import { SeoService } from '../../../shared/seo/shared/seo.service';
import { MediaService } from '../../../shared/media/media.service';
import { MockMediaService } from '../../../shared/media/mock-media.service';
import { MediaModule } from '../../../shared/media/media.module';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule,
        LocalizeRouterModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatCardModule,
        NgxJsonLdModule,
        SeoModule,
        MediaModule,
        MatCardModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [RecipeListComponent],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: RecipeService, useClass: MockRecipeService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        SeoService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
