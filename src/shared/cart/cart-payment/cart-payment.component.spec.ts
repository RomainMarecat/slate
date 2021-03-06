import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockCartService } from '../shared/mock-cart.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { AlertService } from '../../popup/alert.service';
import { PaymentService } from '../../payment/shared/payment.service';
import { MockOrderService } from '../../order/shared/mock-order.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CartService } from '../shared/cart.service';
import { OrderService } from '../../order/shared/order.service';
import { MockPaymentService } from '../../payment/shared/mock-payment.service';
import { MockUserService } from '../../user/shared/mock-user.service';
import { UserService } from '../../user/shared/user.service';
import { CartPaymentComponent } from './cart-payment.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingState } from '../../util/routing-state';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxStripeModule, StripeService } from 'ngx-stripe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoaderService } from '../../loader/loader.service';
import { MockLoaderService } from '../../loader/mock-loader.service';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { DeliveryService } from '../shared/delivery.service';
import { MockDeliveryService } from '../shared/mock-delivery.service';
import { ProductService } from '../../product/shared/product.service';
import { MockProductService } from '../../product/shared/mock-product.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('CartPaymentComponent', () => {
  let component: CartPaymentComponent;
  let fixture: ComponentFixture<CartPaymentComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
        NoopAnimationsModule,
        FormsModule,
        NgxStripeModule.forRoot('pk_test_ZMBhVWlsAzGDErk8PFH28TWX'),
        ReactiveFormsModule,
        FlexLayoutModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [
        CartPaymentComponent,
      ],
      providers: [
        RoutingState,
        {provide: AlertService, useClass: MockAlertService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: CartService, useClass: MockCartService},
        {provide: DeliveryService, useClass: MockDeliveryService},
        {provide: OrderService, useClass: MockOrderService},
        {provide: PaymentService, useClass: MockPaymentService},
        {provide: UserService, useClass: MockUserService},
        {provide: StripeService, useClass: StripeService},
        {provide: ProductService, useClass: MockProductService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
