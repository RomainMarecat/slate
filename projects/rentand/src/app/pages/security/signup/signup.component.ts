import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RegisterFailureResponse } from '../../../shared/interfaces/api/api-register-response';
import { User } from '../../../shared/interfaces/user';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ToastService } from '../../../shared/services/toast.service';
import { AppState } from '../../../shared/store/app.state';
import { selectRegisterFormsErrors } from '../../../shared/store/forms-errors/selectors/forms-errors.selector';
import { Register } from '../../../shared/store/user/actions/register.action';
import { selectLoggedIn } from '../../../shared/store/user/selectors/user.selector';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  user: User;
  form: FormGroup;
  authenticated$: Observable<boolean>;
  formErrors: string[] = [];

  constructor(private router: Router,
              private http: HttpClient,
              private authenticationService: AuthenticationService,
              private toastService: ToastService,
              private translateService: TranslateService,
              private formBuilder: FormBuilder,
              private store: Store<AppState>) {
    this.form = this.getForm();
    this.checkAuthenticated();
  }

  getForm() {
    return this.formBuilder.group({
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
      ]],
      newsletter: [true, [
        Validators.required
      ]]
    });
  }

  checkAuthenticated() {
    this.authenticated$ = this.store.select(selectLoggedIn);
  }

  logout() {
    this.authenticationService.logout();
  }

  signUp() {
    if (this.form.valid) {
      this.store.dispatch(new Register(this.form.getRawValue()));

      this.store.select(selectRegisterFormsErrors)
        .subscribe((registerFailureResponse: RegisterFailureResponse) => {
          if (registerFailureResponse) {
            Object.keys(registerFailureResponse.form_errors).forEach(key => {
              if (Object.keys(this.form.controls).includes(key)) {
                Object.keys(this.form.controls).forEach(control => {
                  if (control === key) {
                    const error = {};
                    error[control] = registerFailureResponse.form_errors[key];
                    this.form.get(control).setErrors(error);
                  }
                });
                return;
              }

              this.formErrors.push(this.formErrors[key]);
            });
          }
        });
    }
  }
}
