import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingAddComponent } from './booking-add.component';
import { BookingService } from '../shared/booking.service';
import { MockBookingService } from '../shared/mock-booking.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BookingAddComponent', () => {
  let component: BookingAddComponent;
  let fixture: ComponentFixture<BookingAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [ BookingAddComponent ],
      providers: [
        {provide: BookingService, useClass: MockBookingService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
