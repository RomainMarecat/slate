import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CmsListComponent } from './cms-list.component';
import { CmsService } from '../../../cms/shared/cms.service';
import { MockCmsService } from '../../../cms/shared/mock-cms.service';
import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MenuService } from '../../../menu/menu.service';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../../../router/mock-localize-router.service';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';

describe('CmsListComponent', () => {
  let component: CmsListComponent;
  let fixture: ComponentFixture<CmsListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        FlexLayoutModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        LocalizeRouterModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatInputModule,
        MatCheckboxModule,
        MatListModule,
        MatToolbarModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [CmsListComponent],
      providers: [
        {provide: CmsService, useClass: MockCmsService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        MenuService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
