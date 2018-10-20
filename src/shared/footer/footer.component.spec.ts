import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
  MatToolbarModule
} from '@angular/material';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { FooterComponent } from './footer.component';
import { MockCmsService } from '../cms/shared/mock-cms.service';
import { CmsService } from '../cms/shared/cms.service';
import { CmsDetailService } from '../cms-detail/shared/cms-detail.service';
import { MockCmsDetailService } from '../cms-detail/shared/mock-cms-detail.service';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        Angulartics2Module.forRoot( {
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [FooterComponent],
      providers: [
        {provide: CmsService, useClass: MockCmsService},
        {provide: CmsDetailService, useClass: MockCmsDetailService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
