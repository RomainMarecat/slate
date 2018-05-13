import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../shared/booking.service';
import { AlertService } from '../../popup/alert.service';

@Component({
  selector: 'app-booking-add',
  templateUrl: './booking-add.component.html',
  styleUrls: [ './booking-add.component.scss' ]
})
export class BookingAddComponent implements OnInit {

  reasons: { name: string }[] = [];
  form: FormGroup = BookingAddComponent.getForm();

  static getForm(): FormGroup {
    return new FormGroup({
      reason: new FormControl('', [ Validators.required ])
    });
  }

  constructor(private bookingService: BookingService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.reasons = [
      {name: 'reason.creation'},
      {name: 'reason.prunning'},
      {name: 'reason.maintenance'},
      {name: 'reason.spray'},
      {name: 'reason.planning'},
    ];
  }

  save() {
    if (this.form.valid) {
      const booking = {...this.form.value};
      this.bookingService.createBooking(booking)
        .then(doc => {
          booking.key = doc.id;
          this.bookingService.updateBooking(booking)
            .then(() => {
              this.alertService.show('booking.saved');
            }, (err) => this.alertService.show(err));
        }, (err) => this.alertService.show(err));
    }
  }

}
