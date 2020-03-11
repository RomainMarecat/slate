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
import { CartListComponent } from './cart-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingState } from '../../util/routing-state';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { StorageModule } from '../../media/storage/storage.module';
import { MediaModule } from '../../media/media.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('CartListComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatTooltipModule,
        MatStepperModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        StorageModule,
        MediaModule,
        NoopAnimationsModule,
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
        CartItemComponent
      ],
      providers: [
        RoutingState,
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
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
    fixture = TestBed.createComponent(CartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
