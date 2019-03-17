import { Component, OnInit } from '@angular/core';
import { AccountNavigation } from '../shared/account-navigation';
import { UserService } from '../../user/shared/user.service';
import { LocalizeRouterService } from 'localize-router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  accountNavigations: AccountNavigation[] = [
    {
      avatar: 'tasks',
      description: 'account.orders.description',
      link: 'orders',
      name: 'account.orders.name'
    },
    {
      avatar: 'user',
      description: 'account.informations.description',
      link: 'preferences',
      name: 'account.informations.name'
    },
    {
      avatar: 'address-card',
      description: 'account.delivery.description',
      link: 'deliveries',
      name: 'account.delivery.name'
    },
    // {
    //   avatar: 'bell',
    //   description: 'account.notification.description',
    //   link: 'notification',
    //   name: 'account.notification.name'
    // },
    {
      avatar: 'star-o',
      description: 'account.favorite.description',
      link: 'favorites',
      name: 'account.favorite.name'
    },
    {
      avatar: 'power-off',
      description: 'account.logout.description',
      link: 'logout',
      name: 'account.logout.name'
    }
  ];

  constructor(private userService: UserService,
              private router: Router,
              private localizeRouterService: LocalizeRouterService) {
  }

  ngOnInit() {
  }

  onLogout() {
    this.userService.logout()
      .subscribe(() => {
        this.router.navigate([this.localizeRouterService.translateRoute('/')]);
      });
  }

}
