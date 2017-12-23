import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CategoryListComponent } from './category-list.component';
import { CategoryService } from '../../../shared/navigation/category/category.service';
import { MockCategoryService } from '../../../shared/navigation/category/mock-category.service';
import { MockAlertService } from '../../../../alert/mock-alert.service';
import { AlertService } from '../../../../alert/alert.service';
import {SharedModule} from '../../../../shared.module';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture < CategoryListComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          BrowserModule,
          HttpClientModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          NgxDatatableModule,
          SharedModule
        ],
        declarations: [CategoryListComponent],
        providers: [
          { provide: CategoryService, useClass: MockCategoryService },
          { provide: AlertService, useClass: MockAlertService },
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});