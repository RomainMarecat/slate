import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDeliveryComponent } from './cart-delivery.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatStepperModule,
  MatTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StripeService } from 'ngx-stripe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { MockStoreModule } from '../../../shared/store/mock/mock-store.module';
import { initialAppState } from '../../../shared/store/app.state';

describe('CartDeliveryComponent', () => {
  let component: CartDeliveryComponent;
  let fixture: ComponentFixture<CartDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatListModule,
        MatTooltipModule,
        MatStepperModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        RouterTestingModule,
        MockStoreModule.forRoot('app', initialAppState),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return 'mock.token';
            }
          }
        }),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [CartDeliveryComponent],
      providers: [
        StripeService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
