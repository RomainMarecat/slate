import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockMatIconComponent } from '../../mock/mock-mat-icon.component';

import { SearchDialogComponent } from './search-dialog.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { RecipeService } from '../../../app-recipe/recipe/shared/recipe.service';
import { MockRecipeService } from '../../../app-recipe/recipe/shared/mock-recipe.service';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

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
    fixture = TestBed.createComponent(SearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
