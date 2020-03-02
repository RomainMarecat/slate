import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BookingsService } from '../../shared/services/bookings.service';
import { UserService } from '../../shared/services/user.service';
import { initialAppState } from '../../shared/store/app.state';
import { MockStoreModule } from '../../shared/store/mock/mock-store.module';
import { CartService } from '../../shared/services/cart.service';
import { BookingMonoCardModule } from './booking-mono-card/booking-mono-card.module';

import { BookingPipeComponent } from './booking-pipe.component';
import { BookingPipeService } from './booking-pipe.service';
import { BookingSummaryModule } from './booking-summary/booking-summary.module';
import { PipeInfosModule } from './pipe-infos/pipe-infos.module';
import { PipeLoginModule } from './pipe-login/pipe-login.module';
import { PipePaymentModule } from './pipe-payment/pipe-payment.module';

describe('BookingPipeComponent', () => {
  let component: BookingPipeComponent;
  let fixture: ComponentFixture<BookingPipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BookingPipeComponent,
      ],
      imports: [
        MatTabsModule,
        NoopAnimationsModule,
        PipeInfosModule,
        PipeLoginModule,
        PipePaymentModule,
        BookingMonoCardModule,
        BookingSummaryModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
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
        BookingPipeService,
        BookingsService,
        CartService,
        UserService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
