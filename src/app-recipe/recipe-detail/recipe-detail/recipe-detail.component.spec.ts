import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockMatIconComponent } from '../../../shared/mock/mock-mat-icon.component';

import { RecipeDetailComponent } from './recipe-detail.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RecipeInformationComponent } from './recipe-information/recipe-information.component';
import { RecipePreparationListComponent } from './recipe-preparation-list/recipe-preparation-list.component';
import { RecipeInstructionListComponent } from './recipe-instruction-list/recipe-instruction-list.component';
import { RecipeTitleComponent } from './recipe-title/recipe-title.component';
import { configureTestSuite } from '../../../shared/unit-test/configure-test-suite';
import { SeoModule } from '../../../shared/seo/seo.module';
import { ScrollModule } from '../../../shared/scroll/scroll.module';
import { AlertService } from '../../../shared/popup/alert.service';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { RecipeService } from '../../recipe/shared/recipe.service';
import { MockRecipeService } from '../../recipe/shared/mock-recipe.service';
import { SeoService } from '../../../shared/seo/shared/seo.service';
import { ScrollService } from '../../../shared/scroll/shared/scroll.service';
import { MockLocalizeRouterService } from '../../../shared/router/mock-localize-router.service';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { MediaModule } from '../../../shared/media/media.module';
import { MediaService } from '../../../shared/media/media.service';
import { MockMediaService } from '../../../shared/media/mock-media.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule,
        LocalizeRouterModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatStepperModule,
        ScrollingModule,
        MatCardModule,
        MediaModule,
        NgxJsonLdModule,
        NgPipesModule,
        SeoModule,
        MatCardModule,
        RouterTestingModule,
        ScrollModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [
        RecipeDetailComponent,
        RecipeInformationComponent,
        RecipeInstructionListComponent,
        RecipePreparationListComponent,
        RecipeTitleComponent
      ],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: RecipeService, useClass: MockRecipeService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: SeoService, useClass: SeoService},
        {provide: ScrollService, useClass: ScrollService},
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
    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
