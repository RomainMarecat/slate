import { Component, OnInit } from '@angular/core';
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
}
