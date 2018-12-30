import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEditComponent } from './recipe-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../../app-recipe/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxEditorModule } from 'ngx-editor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../../shared.module';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MockLocalizeRouterService } from '../../../../router/mock-localize-router.service';
import { AlertService } from '../../../../popup/alert.service';
import { MockAlertService } from '../../../../popup/mock-alert.service';
import { LoaderService } from '../../../../loader/loader.service';
import { MockLoaderService } from '../../../../loader/mock-loader.service';
import { RecipeService } from '../../../../../app-recipe/public/recipe/shared/recipe.service';
import { MockRecipeService } from '../../../../../app-recipe/public/recipe/shared/mock-recipe.service';
import { configureTestSuite } from '../../../../unit-test/configure-test-suite';
import { MediaService } from '../../../../media/media.service';
import { MockMediaService } from '../../../../media/mock-media.service';
import { InstructionEditComponent } from './instruction-edit/instruction-edit.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgSelectModule } from '@ng-select/ng-select';
import { PreparationEditComponent } from './preparation-edit/preparation-edit.component';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { IngredientService } from '../../../../../app-recipe/public/ingredient/shared/ingredient.service';
import { MockIngredientService } from '../../../../../app-recipe/public/ingredient/shared/mock-ingredient.service';
import { ContrastService } from '../../../../contrast/contrast.service';

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ColorPickerModule,
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        NgxDatatableModule,
        NgxEditorModule,
        NgSelectModule,
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        LocalizeRouterModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [
        RecipeEditComponent,
        InstructionEditComponent,
        PreparationEditComponent,
        IngredientEditComponent,
        IngredientListComponent
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: RecipeService, useClass: MockRecipeService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: IngredientService, useClass: MockIngredientService},
        ContrastService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
