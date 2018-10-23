import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsDetailComponent } from './cms-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CmsDetailService } from '../shared/cms-detail.service';
import { MockCmsDetailService } from '../shared/mock-cms-detail.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LoaderService } from '../../loader/loader.service';
import { MockLoaderService } from '../../loader/mock-loader.service';
import { configureTestSuite } from '../../unit-test/configure-test-suite';

describe('CmsDetailComponent', () => {
  let component: CmsDetailComponent;
  let fixture: ComponentFixture<CmsDetailComponent>;

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
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [
        CmsDetailComponent
      ],
      providers: [
        {provide: CmsDetailService, useClass: MockCmsDetailService},
        {provide: LoaderService, useClass: MockLoaderService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
