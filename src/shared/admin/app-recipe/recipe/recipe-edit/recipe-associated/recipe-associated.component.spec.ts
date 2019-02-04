import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { configureTestSuite } from '../../../../../unit-test/configure-test-suite';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../../../app-recipe/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../../../shared.module';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MockLocalizeRouterService } from '../../../../../router/mock-localize-router.service';
import { FormControl } from '@angular/forms';
import { RecipeAssociatedComponent } from './recipe-associated.component';
import { mockRecipes } from '../../../../../../app-recipe/recipe/shared/mock-recipe';
import { RecipeService } from '../../../../../../app-recipe/recipe/shared/recipe.service';
import { MockRecipeService } from '../../../../../../app-recipe/recipe/shared/mock-recipe.service';

describe('RecipeAssociatedComponent', () => {
  let component: RecipeAssociatedComponent;
  let fixture: ComponentFixture<RecipeAssociatedComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        NgSelectModule,
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        LocalizeRouterModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [RecipeAssociatedComponent],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: RecipeService, useClass: MockRecipeService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeAssociatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with empty form', () => {
    component.recipes = mockRecipes;
    component._form = new FormControl([]);
    expect(component).toBeTruthy();
  });
});
