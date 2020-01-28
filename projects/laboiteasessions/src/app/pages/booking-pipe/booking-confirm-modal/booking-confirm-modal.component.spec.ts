import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BookingsService } from '../../../shared/services/bookings.service';
import { BookingMonoCardModule } from '../booking-mono-card/booking-mono-card.module';
import { BookingSummaryModule } from '../booking-summary/booking-summary.module';

import { BookingConfirmModalComponent } from './booking-confirm-modal.component';

describe('BookingConfirmModalComponent', () => {
  let component: BookingConfirmModalComponent;
  let fixture: ComponentFixture<BookingConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingConfirmModalComponent],
      imports: [
        NoopAnimationsModule,
        MatDialogModule,
        HttpClientTestingModule,
        BookingMonoCardModule,
        BookingSummaryModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: [
        BookingsService,
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {
          provide: MatDialogRef, useValue: {
            close: () => {
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
