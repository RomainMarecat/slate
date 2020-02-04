import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
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
import { PasswordResetFormComponent } from '../password-reset-form/password-reset-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
  showRegisterLink: boolean;

  constructor(private router: Router,
              private http: HttpClient,
              private authenticationService: AuthenticationService,
              private toastService: ToastService,
              private translateService: TranslateService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private store: Store<AppState>) {
    // @Inject(MAT_DIALOG_DATA) public data: {showRegisterLink: boolean}
    this.form = this.getForm();
  }


  ngOnInit() {
    this.checkAuthenticated();
    // this.showRegisterLink = !!this.data.showRegisterLink;
    this.showRegisterLink = true;
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
    this.authenticated$
      .subscribe((authenticated) => {
        if (!!authenticated) {
          // this.matDialogRef.close(authenticated);
        }
      });
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
    const dialogRef = this.dialog.open(PasswordResetFormComponent,
      {...this.config, ...{data: this.form.value.username}});
  }
}
