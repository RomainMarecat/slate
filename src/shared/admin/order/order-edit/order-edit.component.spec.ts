import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxEditorModule } from 'ngx-editor';
import { environment } from '../../../../app-hockey/environments/environment';
import { DeliveryService } from '../../../cart/shared/delivery.service';
import { MockDeliveryService } from '../../../cart/shared/mock-delivery.service';
import { LoaderService } from '../../../loader/loader.service';
import { MockLoaderService } from '../../../loader/mock-loader.service';
import { MockOrderService } from '../../../order/shared/mock-order.service';
import { OrderService } from '../../../order/shared/order.service';
import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { MockLocalizeRouterService } from '../../../router/mock-localize-router.service';
import { SharedModule } from '../../../shared.module';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';

import { OrderEditComponent } from './order-edit.component';

describe('OrderEditComponent', () => {
  let component: OrderEditComponent;
  let fixture: ComponentFixture<OrderEditComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        ClipboardModule,
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
        {provide: DeliveryService, useClass: MockDeliveryService},
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
