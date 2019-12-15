import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { initialAppState } from '../../../shared/store/app.state';
import { MockStoreModule } from '../../../shared/store/mock/mock-store.module';
import { BookingMonoCardModule } from '../booking-mono-card/booking-mono-card.module';
import { BookingPipeService } from '../booking-pipe.service';
import { BookingSummaryModule } from '../booking-summary/booking-summary.module';

import { PipePaymentComponent } from './pipe-payment.component';
import { StripeFormComponent } from './stripe-form/stripe-form.component';

describe('PipePaymentComponent', () => {
  let component: PipePaymentComponent;
  let fixture: ComponentFixture<PipePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PipePaymentComponent,
        StripeFormComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BookingSummaryModule,
        BookingMonoCardModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return 'mock.token';
            }
          }
        }),
        MockStoreModule.forRoot('app', initialAppState),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: [
        BookingPipeService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
