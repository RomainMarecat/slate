import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseListComponent } from './base-list.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../../shared.module';
import { MenuService } from '../../../menu/menu.service';
import { MockLocalizeRouterService } from '../../../router/mock-localize-router.service';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { VisitorService } from '../../../firestore/visitor.service';
import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { LoaderService } from '../../../loader/loader.service';
import { MockLoaderService } from '../../../loader/mock-loader.service';
import { MockVisitorService } from '../../../firestore/mock-visitor.service';

describe('BaseListComponent', () => {
  let component: BaseListComponent<{}>;
  let fixture: ComponentFixture<BaseListComponent<{}>>;

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
      declarations: [BaseListComponent],
      providers: [
        MenuService,
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: VisitorService, useClass: MockVisitorService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LoaderService, useClass: MockLoaderService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
