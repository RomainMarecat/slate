import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../shared/interfaces/user';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: User;
  form: FormGroup;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordCheck: string;

  constructor(private router: Router,
              private http: HttpClient,
              private authService: AuthService,
              private toastService: ToastService,
              private translateService: TranslateService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.authService.redirectToSignup$.subscribe(
      email => {
        this.email = email;
      }
    );
    this.form = this.formBuilder.group({
      firstname: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]],
      lastname: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]],
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
      ]],
      passwordCheck: ['', [
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
    this.authService.logout();
  }

  loginCheck(username: string, password: string) {
    this.authService.loginCheck(username, password);
  }

  signUp() {
    this.authService.signUprentand(this.firstname, this.lastname, this.email, this.password, {
      redirectUri: this.router.url === ('/login' || '/signup') ? '' : this.router.url.substr(1, this.router.url.length)
    });
  }

}
