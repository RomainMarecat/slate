import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTitleComponent } from './recipe-title.component';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { SeoModule } from 'shared/seo/seo.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AlertService } from 'shared/popup/alert.service';
import { MockAlertService } from 'shared/popup/mock-alert.service';
import { RecipeService } from '../../shared/recipe.service';
import { MockRecipeService } from '../../shared/mock-recipe.service';
import { SeoService } from 'shared/seo/shared/seo.service';
import { MockLocalizeRouterService } from 'shared/router/mock-localize-router.service';

describe('RecipeTitleComponent', () => {
  let component: RecipeTitleComponent;
  let fixture: ComponentFixture<RecipeTitleComponent>;

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
      declarations: [RecipeTitleComponent],
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
    fixture = TestBed.createComponent(RecipeTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
