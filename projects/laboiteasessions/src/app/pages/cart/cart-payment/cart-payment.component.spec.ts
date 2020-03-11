import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CartPaymentComponent } from './cart-payment.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxStripeModule, StripeService } from 'ngx-stripe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStoreModule } from '../../../shared/store/mock/mock-store.module';
import { initialAppState } from '../../../shared/store/app.state';
import { JwtModule } from '@auth0/angular-jwt';
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
        MockStoreModule.forRoot('app', initialAppState),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return 'mock.token';
            }
          }
        }),
      ],
      declarations: [
        CartPaymentComponent,
      ],
      providers: [
        StripeService
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
