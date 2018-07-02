import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-login-list',
  templateUrl: './login-list.component.html',
  styleUrls: ['./login-list.component.scss']
})
export class LoginListComponent implements OnInit {
  features = [
    {link: 'login1', name: 'user.list.logins.login1.name'},
    {link: 'login2', name: 'user.list.logins.login2.name'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
