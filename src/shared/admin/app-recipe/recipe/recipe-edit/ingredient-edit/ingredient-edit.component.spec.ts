import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientEditComponent } from './ingredient-edit.component';
import { configureTestSuite } from '../../../../../unit-test/configure-test-suite';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../../../app-recipe/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxEditorModule } from 'ngx-editor';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../../../shared.module';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { MockLocalizeRouterService } from '../../../../../router/mock-localize-router.service';
import { LoaderService } from '../../../../../loader/loader.service';
import { MockLoaderService } from '../../../../../loader/mock-loader.service';
import { FormGroup } from '@angular/forms';
import { IngredientService } from '../../../../../../app-recipe/ingredient/shared/ingredient.service';
import { MockIngredientService } from '../../../../../../app-recipe/ingredient/shared/mock-ingredient.service';

describe('IngredientEditComponent', () => {
  let component: IngredientEditComponent;
  let fixture: ComponentFixture<IngredientEditComponent>;

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
      declarations: [IngredientEditComponent],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: IngredientService, useClass: MockIngredientService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with empty form', () => {
    component.form = new FormGroup({});
    expect(component).toBeTruthy();
  });
});
