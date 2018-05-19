import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { MockCartService } from '../shared/mock-cart.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { AlertService } from '../../popup/alert.service';
import { PaymentService } from '../../payment/shared/payment.service';
import { MockOrderService } from '../../order/shared/mock-order.service';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule,
  MatTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CartListComponent } from '../cart-list/cart-list.component';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartEditComponent } from '../cart-edit/cart-edit.component';
import { CartConfirmationComponent } from '../cart-confirmation/cart-confirmation.component';
import { CartService } from '../shared/cart.service';
import { OrderService } from '../../order/shared/order.service';
import { MockPaymentService } from '../../payment/shared/mock-payment.service';
import { CartPaymentComponent } from '../cart-payment/cart-payment.component';
import { MockUserService } from '../../user/mock-user.service';
import { UserService } from '../../user/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingState } from '../../util/routing-state';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxStripeModule, StripeService } from 'ngx-stripe';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonModule,
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
        CartComponent,
      ],
      providers: [
        RoutingState,
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
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
