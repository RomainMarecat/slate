import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListComponent } from './recipe-list.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../../../shared.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MenuService } from '../../../../menu/menu.service';
import { MockLocalizeRouterService } from '../../../../router/mock-localize-router.service';
import { AlertService } from '../../../../popup/alert.service';
import { MockAlertService } from '../../../../popup/mock-alert.service';
import { LoaderService } from '../../../../loader/loader.service';
import { MockLoaderService } from '../../../../loader/mock-loader.service';
import { RecipeService } from '../../../../../app-recipe/recipe/shared/recipe.service';
import { MockRecipeService } from '../../../../../app-recipe/recipe/shared/mock-recipe.service';
import { configureTestSuite } from '../../../../unit-test/configure-test-suite';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        LocalizeRouterModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        SharedModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [RecipeListComponent],
      providers: [
        MenuService,
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: RecipeService, useClass: MockRecipeService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LoaderService, useClass: MockLoaderService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
