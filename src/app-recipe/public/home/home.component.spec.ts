import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AlertService } from '../../../shared/popup/alert.service';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { RecipeService } from '../recipe/shared/recipe.service';
import { MockRecipeService } from '../recipe/shared/mock-recipe.service';
import { SeoService } from '../../../shared/seo/shared/seo.service';
import { MockLocalizeRouterService } from '../../../shared/router/mock-localize-router.service';
import { ReactiveFormsModule } from '@angular/forms';
import { configureTestSuite } from '../../../shared/unit-test/configure-test-suite';
import { RecipeModule } from '../recipe/recipe.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SeoModule } from '../../../shared/seo/seo.module';

describe('HomeComponent', () => {
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
        SeoModule,
        RecipeModule,
        MatCardModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [HomeComponent],
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
