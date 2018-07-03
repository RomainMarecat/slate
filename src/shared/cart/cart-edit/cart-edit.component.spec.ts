import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
import { CartService } from '../shared/cart.service';
import { OrderService } from '../../order/shared/order.service';
import { MockPaymentService } from '../../payment/shared/mock-payment.service';
import { MockUserService } from '../../user/shared/mock-user.service';
import { UserService } from '../../user/shared/user.service';
import { CartEditComponent } from './cart-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingState } from '../../util/routing-state';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CartEditComponent', () => {
  let component: CartEditComponent;
  let fixture: ComponentFixture<CartEditComponent>;

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
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [
        CartEditComponent,
      ],
      providers: [
        RoutingState,
        {provide: AlertService, useClass: MockAlertService},
        {provide: CartService, useClass: MockCartService},
        {provide: OrderService, useClass: MockOrderService},
        {provide: PaymentService, useClass: MockPaymentService},
        {provide: UserService, useClass: MockUserService},
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
