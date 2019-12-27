import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as _moment from 'moment';
import { Booking } from '../../shared/interfaces/booking';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/auth.service';
import { BookingsService } from '../../shared/services/bookings.service';
import { BookingConfirmModalComponent } from '../booking-pipe/booking-confirm-modal/booking-confirm-modal.component';

const moment = _moment;

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyAccountComponent implements OnInit {

  user: User;
  bookings: Booking[];
  rows: any;
  selected = [];
  error: any;
  dataLoaded = false;
  userMetadata: string;
  email: string;

  maxDate = new Date();
  startDate = new Date(1990, 0, 1);
  datePicked: any;

  constructor(public authService: AuthService,
              public bookingsService: BookingsService,
              public router: Router,
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.initProfile();
  }

  loadBookings() {
    return this.bookingsService
      .getAllUserBookings()
      .subscribe((bookings) => {
        this.rows = bookings;
        this.dataLoaded = true;
      });
  }


  initProfile() {
    this.user = this.authService.getUser();

    if (this.user && this.user.user_metadata) {
      if (this.user.user_metadata.address) {
        this.user.user_metadata.address = {
          street: '',
          zip_code: '',
          city: '',
          state: '',
          country: ''
        };
      }
      this.datePicked = moment(this.user.user_metadata.birthday, 'YYYY-MM-DD').isValid() ?
        moment(this.user.user_metadata.birthday, 'YYYY-MM-DD').toDate() : moment().toDate();
      this.email = this.user.email;
    }

    this.user = null;
    this.loadBookings();
  }

  saveProfile() {
    this.authService.updateUser(this.user)
      .subscribe((resp) => {
        this.openSnackBar(this.translateService.instant('my_account.user_saved'), 'OK', ['green']);
      });
  }

  openSnackBar(message: string, action: string, classes = ['orange']) {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: classes
    });
  }

  onSelect({selected}) {
    if (this.selected && this.selected.length > 0) {
      const booking = this.selected[0];
      if (booking.isPayed && !booking.addedByMono) {
        this.dialog.open(BookingConfirmModalComponent, {data: booking.id, width: '80%', height: '90%'});
      }
    }
  }

  onActivate(event) {
  }

  birthdayChanged(event: any) {
    this.user.user_metadata.birthday = moment(event).format('YYYY-MM-DD');
  }
}
