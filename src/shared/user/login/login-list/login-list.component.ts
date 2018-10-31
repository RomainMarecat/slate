import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-login-list',
  templateUrl: './login-list.component.html',
  styleUrls: ['./login-list.component.scss']
})
export class LoginListComponent implements OnInit {
  features = [
    {link: 'login1', name: 'user.list.logins.login1.name'},
    {link: 'login2', name: 'user.list.logins.login2.name'},
  ];

  constructor(private router: Router,
              private localizeRouterService: LocalizeRouterService) {
  }

  ngOnInit() {
  }

  /**
   * Navigate to child route
   */
  navigateTo(link: string) {
    this.router.navigate([
      this.localizeRouterService.translateRoute('/users')
    ]).then(() => {
      this.router.navigate([
        this.localizeRouterService.translateRoute('/users'),
        'logins',
        link
      ]);
    });
  }
}
