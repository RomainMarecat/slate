import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import * as _moment from 'moment';
import { Booking } from '../../shared/interfaces/booking';
import { User } from '../../shared/interfaces/user';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserService } from '../../shared/services/user.service';
import { AppState } from '../../shared/store/app.state';
import { selectUser } from '../../shared/store/user/selectors/user.selector';
import { UserState } from '../../shared/store/user/states/user.state';
import { BookingConfirmModalComponent } from '../booking-pipe/booking-confirm-modal/booking-confirm-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

const moment = _moment;

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyAccountComponent implements OnInit {
  columns: TableColumn[] = [];
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
  form: FormGroup;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private store: Store<AppState>,
              private translateService: TranslateService) {
    this.form = this.getForm();
  }

  ngOnInit() {
    this.initProfile();
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      email: [{disabled: true, value: ''}],
      user_metadata: this.formBuilder.group({
        gender: [null, [Validators.required]],
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        phone: this.formBuilder.group({
          number: ['', [Validators.required]],
          country_number: ['33', [Validators.required]],
          country_code: ['FR', [Validators.required]],
        }),
        birthday: [null, [Validators.required]],
        nationality: ['', [Validators.required]],
        mother_lang: ['', [Validators.required]],
        address: this.formBuilder.group({
          street: '',
          zipcode: '',
          city: '',
          country: '',
        })
      })
    });
  }

  loadBookings() {
    return this.userService
      .getAllUserBookings()
      .subscribe((bookings) => {
        this.rows = bookings;
        this.dataLoaded = true;
      });
  }

  initProfile() {
    this.store.select(selectUser)
      .subscribe((userState: UserState) => {
        if (userState.user) {
          this.form.patchValue(userState.user as {[key: string]: any;});
        }
      });
    this.loadBookings();
  }

  saveProfile() {
    if (this.form.valid) {
      this.userService.updateUser(this.form.getRawValue())
        .subscribe((resp) => {
          this.openSnackBar(this.translateService.instant('my_account.user_saved'), 'OK', ['green']);
        });
      return;
    }
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
}
