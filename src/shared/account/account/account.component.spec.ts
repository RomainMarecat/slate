import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material/material.module';
import { NgPipesModule } from 'ngx-pipes';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { LoaderService } from '../../loader/loader.service';
import { MockLoaderService } from '../../loader/mock-loader.service';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [
        FlexLayoutModule,
        MaterialModule,
        NgPipesModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: AlertService, useClass: MockAlertService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
