import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEditComponent } from './order-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../app-hockey/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxEditorModule } from 'ngx-editor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../shared.module';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BaseEditComponent } from '../../base/base-edit/base-edit.component';
import { MockLocalizeRouterService } from '../../../router/mock-localize-router.service';
import { OrderService } from '../../../order/shared/order.service';
import { MockOrderService } from '../../../order/shared/mock-order.service';
import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { LoaderService } from '../../../loader/loader.service';
import { MockLoaderService } from '../../../loader/mock-loader.service';

describe('OrderEditComponent', () => {
  let component: OrderEditComponent;
  let fixture: ComponentFixture<OrderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        NgxDatatableModule,
        NgxEditorModule,
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        LocalizeRouterModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [OrderEditComponent],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: OrderService, useClass: MockOrderService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LoaderService, useClass: MockLoaderService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
