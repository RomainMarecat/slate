import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { LoaderService } from '../../loader/loader.service';
import { MockLoaderService } from '../../loader/mock-loader.service';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { CartService } from '../../cart/shared/cart.service';
import { MockCartService } from '../../cart/shared/mock-cart.service';
import { OrderService } from '../shared/order.service';
import { MockOrderService } from '../shared/mock-order.service';
import { DeliveryService } from '../../cart/shared/delivery.service';
import { MockDeliveryService } from '../../cart/shared/mock-delivery.service';
import { PaymentService } from '../../payment/shared/payment.service';
import { MockPaymentService } from '../../payment/shared/mock-payment.service';
import { UserService } from '../../user/shared/user.service';
import { MockUserService } from '../../user/shared/mock-user.service';
import { StripeService } from 'ngx-stripe';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { OrderListComponent } from '../order-list/order-list.component';
import { OrderItemComponent } from '../order-item/order-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material/material.module';
import { NgPipesModule } from 'ngx-pipes';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { LoaderModule } from '../../loader/loader.module';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrderComponent,
        OrderListComponent,
        OrderItemComponent,
      ],
      imports: [
        FlexLayoutModule,
        LoaderModule,
        MaterialModule,
        NgPipesModule,
        RouterTestingModule,
        LocalizeRouterModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: CartService, useClass: MockCartService},
        {provide: OrderService, useClass: MockOrderService},
        {provide: DeliveryService, useClass: MockDeliveryService},
        {provide: PaymentService, useClass: MockPaymentService},
        {provide: UserService, useClass: MockUserService},
        {provide: StripeService, useClass: StripeService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
