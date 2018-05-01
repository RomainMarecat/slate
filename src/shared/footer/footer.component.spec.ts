import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatListModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { FooterComponent } from './footer.component';
import { MockCmsService } from '../admin/shared/cms/mock-cms.service';
import { CmsService } from '../admin/shared/cms/cms.service';
import { CmsDetailService } from '../admin/shared/cms-detail/cms-detail.service';
import { MockCmsDetailService } from '../admin/shared/cms-detail/mock-cms-detail.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture < FooterComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          MatToolbarModule,
          Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
            developerMode: true,
            pageTracking: {
              clearIds: true,
            },
          }),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
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
