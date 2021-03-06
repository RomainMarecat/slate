import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angulartics2Module } from 'angulartics2';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { ProductActionComponent } from './product-action.component';
import { MockUserService } from '../../../shared/user/shared/mock-user.service';
import { UserService } from '../../../shared/user/shared/user.service';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { ScoreService } from '../../../shared/score/score.service';
import { MockScoreService } from '../../../shared/score/mock-score.service';
import { configureTestSuite } from '../../../shared/unit-test/configure-test-suite';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('ProductActionComponent', () => {
  let component: ProductActionComponent;
  let fixture: ComponentFixture<ProductActionComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        BrowserModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatInputModule,
        MatCheckboxModule,
        MatListModule,
        Angulartics2Module.forRoot({
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [ProductActionComponent],
      providers: [
        {provide: UserService, useClass: MockUserService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: ScoreService, useClass: MockScoreService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
