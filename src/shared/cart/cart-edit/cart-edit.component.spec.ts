import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { LoaderService } from '../../loader/loader.service';
import { MockLoaderService } from '../../loader/mock-loader.service';
import { MediaModule } from '../../media/media.module';
import { StorageModule } from '../../media/storage/storage.module';
import { MockOrderService } from '../../order/shared/mock-order.service';
import { OrderService } from '../../order/shared/order.service';
import { MockPaymentService } from '../../payment/shared/mock-payment.service';
import { PaymentService } from '../../payment/shared/payment.service';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MockUserService } from '../../user/shared/mock-user.service';
import { UserService } from '../../user/shared/user.service';
import { RoutingState } from '../../util/routing-state';
import { CartService } from '../shared/cart.service';
import { MockCartService } from '../shared/mock-cart.service';
import { CartEditComponent } from './cart-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CartListComponent } from '../cart-list/cart-list.component';
import { CartItemComponent } from '../cart-item/cart-item.component';

describe('CartEditComponent', () => {
  let component: CartEditComponent;
  let fixture: ComponentFixture<CartEditComponent>;

  configureTestSuite();

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
        StorageModule,
        MediaModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        RouterTestingModule,
        LocalizeRouterModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [
        CartEditComponent,
        CartListComponent,
        CartItemComponent
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
