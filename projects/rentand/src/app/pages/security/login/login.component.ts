import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';

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
  email: string;
  password: string;

  actionsAlignment: string;
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
              private authService: AuthService,
              private toastService: ToastService,
              private translateService: TranslateService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog) {
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [
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

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.userLoggedOut.emit();
    this.authService.logout();
  }

  loginCheck() {
    this.userLoggedIn.emit();
    this.authService.loginCheck(this.email, this.password, {
      redirectUri: this.router.url === ('/login' || '/signup') ? '' : this.router.url
    });
  }

  openPasswordResetDialog() {
    const dialogRef = this.dialog.open(PasswordResetDialogComponent, this.config);
    dialogRef.componentInstance.email = this.email;
  }
}

@Component({
  selector: 'app-password-reset-dialog',
  templateUrl: './password-reset-form.html',
  styleUrls: ['./login.component.scss'],
})
export class PasswordResetDialogComponent implements OnInit {

  email: string;
  form: FormGroup;

  constructor(private authService: AuthService,
              public dialog: MatDialog,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.minLength(1),
        Validators.maxLength(150),
      ]]
    });
  }

  changePassword() {
    if (this.email) {
      this.authService.changePassword(this.email);
      this.dialog.closeAll();
    }
  }
}
