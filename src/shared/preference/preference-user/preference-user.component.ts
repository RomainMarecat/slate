import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'firebase/app';
import { UserService } from '../../user/shared/user.service';
import { AlertService } from '../../popup/alert.service';

@Component({
  selector: 'app-preference-user',
  templateUrl: './preference-user.component.html',
  styleUrls: ['./preference-user.component.scss']
})
export class PreferenceUserComponent implements OnInit {

  form: FormGroup = PreferenceUserComponent.getForm();

  user: User;

  static getForm(user?: User): FormGroup {
    return new FormGroup({
      email: new FormControl(user && user.email ? user.email : ''),
      displayName: new FormControl(user && user.displayName ? user.displayName : ''),
    });
  }

  constructor(private userService: UserService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.userService.getCurrentUser()
      .subscribe((user: User) => {
        this.user = user;
        this.form = PreferenceUserComponent.getForm(user);
      });
  }

  save() {
    if (this.form.valid) {
      this.userService.updateProfile(this.user, this.form.value)
        .subscribe(() => {
          this.alertService.show('preference-user.user.updated');
        }, () => {
          this.alertService.show('preference-user.error.update');
        });
    }
  }

}
