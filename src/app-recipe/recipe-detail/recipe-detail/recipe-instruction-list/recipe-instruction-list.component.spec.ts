import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeInstructionListComponent } from './recipe-instruction-list.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';
import { configureTestSuite } from '../../../../shared/unit-test/configure-test-suite';
import { SeoModule } from '../../../../shared/seo/seo.module';
import { AlertService } from '../../../../shared/popup/alert.service';
import { MockAlertService } from '../../../../shared/popup/mock-alert.service';
import { RecipeService } from '../../../recipe/shared/recipe.service';
import { MockRecipeService } from '../../../recipe/shared/mock-recipe.service';
import { SeoService } from '../../../../shared/seo/shared/seo.service';
import { MockLocalizeRouterService } from '../../../../shared/router/mock-localize-router.service';
import { MediaModule } from '../../../../shared/media/media.module';
import { MediaService } from '../../../../shared/media/media.service';
import { MockMediaService } from '../../../../shared/media/mock-media.service';

describe('RecipeInstructionListComponent', () => {
  let component: RecipeInstructionListComponent;
  let fixture: ComponentFixture<RecipeInstructionListComponent>;

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
        MatCardModule,
        NgPipesModule,
        MediaModule,
        SeoModule,
        MatCardModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [RecipeInstructionListComponent],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: RecipeService, useClass: MockRecipeService},
        {provide: SeoService, useClass: SeoService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeInstructionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
