import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeInformationComponent } from './recipe-information.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AlertService } from '../../../../shared/popup/alert.service';
import { SeoModule } from '../../../../shared/seo/seo.module';
import { RecipeService } from '../../../recipe/shared/recipe.service';
import { configureTestSuite } from '../../../../shared/unit-test/configure-test-suite';
import { MockRecipeService } from '../../../recipe/shared/mock-recipe.service';
import { MockAlertService } from '../../../../shared/popup/mock-alert.service';
import { SeoService } from '../../../../shared/seo/shared/seo.service';
import { MockLocalizeRouterService } from '../../../../shared/router/mock-localize-router.service';

describe('RecipeInformationComponent', () => {
  let component: RecipeInformationComponent;
  let fixture: ComponentFixture<RecipeInformationComponent>;

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
        SeoModule,
        MatCardModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [RecipeInformationComponent],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: RecipeService, useClass: MockRecipeService},
        {provide: SeoService, useClass: SeoService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
