import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartStartComponent } from './cart-start.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatStepperModule,
  MatTooltipModule
} from '@angular/material';
import { NgxStripeModule, StripeService } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CartListComponent } from '../cart-list/cart-list.component';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartPaymentComponent } from '../cart-payment/cart-payment.component';
import { CartConfirmationComponent } from '../cart-confirmation/cart-confirmation.component';
import { CartEditComponent } from '../cart-edit/cart-edit.component';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { RoutingState } from '../../util/routing-state';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { CartService } from '../shared/cart.service';
import { MockCartService } from '../shared/mock-cart.service';
import { OrderService } from '../../order/shared/order.service';
import { MockOrderService } from '../../order/shared/mock-order.service';
import { PaymentService } from '../../payment/shared/payment.service';
import { MockPaymentService } from '../../payment/shared/mock-payment.service';
import { UserService } from '../../user/shared/user.service';
import { MockUserService } from '../../user/shared/mock-user.service';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MockLoaderService } from '../../loader/mock-loader.service';
import { LoaderService } from '../../loader/loader.service';

describe('CartStartComponent', () => {
  let component: CartStartComponent;
  let fixture: ComponentFixture<CartStartComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatTooltipModule,
        MatStepperModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        NgxStripeModule.forRoot('pk_test_ZMBhVWlsAzGDErk8PFH28TWX'),
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        RouterTestingModule,
        LocalizeRouterModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [
        CartListComponent,
        CartItemComponent,
        CartPaymentComponent,
        CartConfirmationComponent,
        CartEditComponent,
        CartStartComponent,
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        RoutingState,
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: CartService, useClass: MockCartService},
        {provide: OrderService, useClass: MockOrderService},
        {provide: PaymentService, useClass: MockPaymentService},
        {provide: UserService, useClass: MockUserService},
        {provide: StripeService, useClass: StripeService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
