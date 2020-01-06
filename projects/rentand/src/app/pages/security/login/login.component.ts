import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { User } from '../../../shared/interfaces/user';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ToastService } from '../../../shared/services/toast.service';
import { AppState } from '../../../shared/store/app.state';
import { Login } from '../../../shared/store/user/actions/login.action';
import { selectLoggedIn } from '../../../shared/store/user/selectors/user.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  @Output() userLoggedIn: EventEmitter<any> = new EventEmitter();
  @Output() userLoggedOut: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  authenticated$: Observable<boolean>;

  user: User;

  config: {
    disableClose: false,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };

  constructor(private router: Router,
              private http: HttpClient,
              private authenticationService: AuthenticationService,
              private toastService: ToastService,
              private translateService: TranslateService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private store: Store<AppState>) {
    this.form = this.getForm();
  }


  ngOnInit() {
    this.checkAuthenticated();
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.email,
        Validators.minLength(1),
        Validators.maxLength(150),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
      ]]
    });
  }

  checkAuthenticated() {
    this.authenticated$ = this.store.select(selectLoggedIn);
  }

  logout() {
    this.userLoggedOut.emit();
    this.authenticationService.logout();
  }

  loginCheck() {
    if (this.form.valid) {
      this.store.dispatch(new Login(this.form.getRawValue()));
    }
  }

  openPasswordResetDialog() {
    const dialogRef = this.dialog.open(PasswordResetDialogComponent,
      {...this.config, ...{data: this.form.value.username}});
  }
}

@Component({
  selector: 'app-password-reset-dialog',
  templateUrl: './password-reset-form.html',
  styleUrls: ['./login.component.scss'],
})
export class PasswordResetDialogComponent {
  form: FormGroup;

  constructor(private authenticationService: AuthenticationService,
              public dialog: MatDialog,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private username: string) {
    this.form = this.getForm(this.username);
  }

  getForm(username?: string): FormGroup {
    return this.formBuilder.group({
      username: [(username || ''), [
        Validators.required,
        Validators.email,
        Validators.minLength(1),
        Validators.maxLength(150),
      ]]
    });
  }

  changePassword() {
    // this.authenticationService.changePassword(this.form.value.email);
    this.dialog.closeAll();
  }
}
