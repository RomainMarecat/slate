import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'firebase';
import { UserService } from '../../user/shared/user.service';

@Component({
  selector: 'app-chat-sidenav-header',
  templateUrl: './chat-sidenav-header.component.html',
  styleUrls: ['./chat-sidenav-header.component.scss']
})
export class ChatSidenavHeaderComponent implements OnInit {

  user: User;

  status: string;

  @Output() searched: EventEmitter<string> = new EventEmitter<string>();

  form: FormGroup = ChatSidenavHeaderComponent.getForm();

  static getForm(): FormGroup {
    return new FormGroup({
      search: new FormControl('')
    });
  }

  constructor(private userService: UserService) {
    this.getUser();
    this.status = 'check_circle_outline';
  }

  ngOnInit() {
  }

  getUser() {
    this.userService.getAuthStateUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  logout() {
    this.userService.logout().subscribe();
  }

  search() {
    if (this.form.valid) {
      this.searched.emit(this.form.value.search);

      return;
    }

    this.searched.emit('');
  }
}
