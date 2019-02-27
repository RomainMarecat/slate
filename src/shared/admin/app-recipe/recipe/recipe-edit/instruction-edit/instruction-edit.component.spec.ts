import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionEditComponent } from './instruction-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../../../app-recipe/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxEditorModule } from 'ngx-editor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../../../shared.module';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { configureTestSuite } from '../../../../../unit-test/configure-test-suite';
import { MockLocalizeRouterService } from '../../../../../router/mock-localize-router.service';
import { RecipeService } from '../../../../../../app-recipe/recipe/shared/recipe.service';
import { MockRecipeService } from '../../../../../../app-recipe/recipe/shared/mock-recipe.service';
import { MediaService } from '../../../../../media/media.service';
import { MockMediaService } from '../../../../../media/mock-media.service';
import { AlertService } from '../../../../../popup/alert.service';
import { MockAlertService } from '../../../../../popup/mock-alert.service';
import { LoaderService } from '../../../../../loader/loader.service';
import { MockLoaderService } from '../../../../../loader/mock-loader.service';
import { MediaModule } from '../../../../../media/media.module';
import { FormModule } from '../../../../../material/form/form.module';
import { FormGroup } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

describe('InstructionEditComponent', () => {
  let component: InstructionEditComponent;
  let fixture: ComponentFixture<InstructionEditComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        FormModule,
        MediaModule,
        NgxDatatableModule,
        NgxEditorModule,
        NgSelectModule,
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        LocalizeRouterModule,
        ColorPickerModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [InstructionEditComponent],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: RecipeService, useClass: MockRecipeService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LoaderService, useClass: MockLoaderService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionEditComponent);
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
