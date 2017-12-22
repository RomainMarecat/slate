///<reference path="../../../core/shared/score/score.service.ts"/>
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionItemComponent } from './selection-item.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../core/shared/shared.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ProductService} from '../../../core/shared/product/product.service';
import {MockProductService} from '../../../core/shared/product/mock-product.service';
import {MockUserService} from '../../../core/shared/user/mock-user.service';
import {MockAlertService} from '../../../core/shared/alert/mock-alert.service';
import {MockLoaderService} from '../../../core/shared/loader/mock-loader.service';
import {MockScoreService} from '../../../core/shared/score/mock-score.service';
import {DateService} from '../../../core/shared/util/date.service';
import {ScoreService} from '../../../core/shared/score/score.service';
import {LoaderService} from '../../../core/shared/loader/loader.service';
import {AlertService} from '../../../core/shared/alert/alert.service';
import {UserService} from '../../../core/shared/user/user.service';
import {I18nService} from '../../../core/shared/i18n/i18n.service';

describe('SelectionItemComponent', () => {
  let component: SelectionItemComponent;
  let fixture: ComponentFixture < SelectionItemComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          HttpClientModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          SharedModule,
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          }),
        ],
        declarations: [SelectionItemComponent],
        providers: [
          { provide: ProductService, useClass: MockProductService },
          { provide: UserService, useClass: MockUserService },
          { provide: AlertService, useClass: MockAlertService },
          { provide: LoaderService, useClass: MockLoaderService },
          { provide: ScoreService, useClass: MockScoreService },
          { provide: DateService, useClass: DateService },
          I18nService
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
