import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.scss']
})
export class PasswordResetFormComponent {

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
