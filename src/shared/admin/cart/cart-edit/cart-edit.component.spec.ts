import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { ClipboardModule } from 'ngx-clipboard';

import { CartService } from '../../../cart/shared/cart.service';
import { DeliveryService } from '../../../cart/shared/delivery.service';
import { MockCartService } from '../../../cart/shared/mock-cart.service';
import { MockDeliveryService } from '../../../cart/shared/mock-delivery.service';
import { LoaderService } from '../../../loader/loader.service';
import { MockLoaderService } from '../../../loader/mock-loader.service';
import { MaterialModule } from '../../../material/material.module';
import { AlertService } from '../../../popup/alert.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { MockLocalizeRouterService } from '../../../router/mock-localize-router.service';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';

import { CartEditComponent } from './cart-edit.component';

describe('CartEditComponent', () => {
  let component: CartEditComponent;
  let fixture: ComponentFixture<CartEditComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CartEditComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        ClipboardModule,
        NgxDatatableModule,

        MaterialModule,
        RouterTestingModule,
        LocalizeRouterModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: CartService, useClass: MockCartService},
        {provide: DeliveryService, useClass: MockDeliveryService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: LoaderService, useClass: MockLoaderService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
