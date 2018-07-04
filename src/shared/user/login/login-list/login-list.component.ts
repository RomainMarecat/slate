import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateTo(link: string) {
    this.router.navigate(['users/logins/' + link]);
  }
}
