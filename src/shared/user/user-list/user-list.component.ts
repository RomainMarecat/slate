import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  features = [
    {link: 'logins', name: 'user.list.logins.name'},
    {link: 'register', name: 'user.list.register.name'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
