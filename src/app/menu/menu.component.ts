import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SidenavService } from './../shared/sidenav/sidenav.service';
import { UserService } from './../shared/user/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private sidenavService: SidenavService, public userService: UserService) {}

  ngOnInit() {}

  /**
   * Can open or close sidenav
   */
  toggleSidenav() {
    this.sidenavService.open();
  }
}
