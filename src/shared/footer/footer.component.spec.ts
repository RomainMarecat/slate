import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { FooterComponent } from './footer.component';
import { MockCmsService } from '../cms/shared/mock-cms.service';
import { CmsService } from '../cms/shared/cms.service';
import { CmsDetailService } from '../cms-detail/shared/cms-detail.service';
import { MockCmsDetailService } from '../cms-detail/shared/mock-cms-detail.service';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../router/mock-localize-router.service';
import { configureTestSuite } from '../unit-test/configure-test-suite';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        Angulartics2Module.forRoot({
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        LocalizeRouterModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [FooterComponent],
      providers: [
        {provide: CmsService, useClass: MockCmsService},
        {provide: CmsDetailService, useClass: MockCmsDetailService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService}
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
