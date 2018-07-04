import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  features = [
    {link: 'logins', name: 'user.list.logins.name'},
    {link: 'registers', name: 'user.list.registers.name'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
