import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CategoryAddComponent } from './category-add.component';
import { CategoryService } from '../../../shared/navigation/category/category.service';
import { MockCategoryService } from '../../../shared/navigation/category/mock-category.service';
import { MockAlertService } from '../../../../popup/mock-alert.service';
import { AlertService } from '../../../../popup/alert.service';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../../../shared.module';

describe('CategoryAddComponent', () => {
  let component: CategoryAddComponent;
  let fixture: ComponentFixture < CategoryAddComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          BrowserModule,
          HttpClientModule,
          FormsModule,
          RouterTestingModule,
          ReactiveFormsModule,
          BrowserAnimationsModule,
          SharedModule,
          NgxDatatableModule,
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          }),
        ],
        declarations: [CategoryAddComponent],
        providers: [
          { provide: CategoryService, useClass: MockCategoryService },
          { provide: AlertService, useClass: MockAlertService },

        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
