import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
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
import { CartWrapperComponent } from './cart-wrapper.component';
import { CartDeliveryComponent } from '../cart-delivery/cart-delivery.component';
import { DeliveryService } from '../shared/delivery.service';
import { MockDeliveryService } from '../shared/mock-delivery.service';
import { StorageModule } from '../../media/storage/storage.module';
import { MediaModule } from '../../media/media.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

describe('CartWrapperComponent', () => {
  let component: CartWrapperComponent;
  let fixture: ComponentFixture<CartWrapperComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatListModule,
        MatTooltipModule,
        MatStepperModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        StorageModule,
        MediaModule,
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
        CartWrapperComponent,
        CartDeliveryComponent
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        RoutingState,
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: CartService, useClass: MockCartService},
        {provide: OrderService, useClass: MockOrderService},
        {provide: PaymentService, useClass: MockPaymentService},
        {provide: DeliveryService, useClass: MockDeliveryService},
        {provide: UserService, useClass: MockUserService},
        {provide: StripeService, useClass: StripeService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
