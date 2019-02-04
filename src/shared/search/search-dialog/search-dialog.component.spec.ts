import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDialogComponent } from './search-dialog.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  MAT_DIALOG_DATA,
  MatAutocompleteModule,
  MatDialogModule, MatDialogRef,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { RecipeService } from '../../../app-recipe/recipe/shared/recipe.service';
import { MockRecipeService } from '../../../app-recipe/recipe/shared/mock-recipe.service';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { configureTestSuite } from '../../unit-test/configure-test-suite';

describe('SearchDialogComponent', () => {
  let component: SearchDialogComponent;
  let fixture: ComponentFixture<SearchDialogComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterTestingModule,
        LocalizeRouterModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [SearchDialogComponent],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        {provide: RecipeService, useClass: MockRecipeService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
