import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SidenavService } from './../shared/sidenav/sidenav.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  toggle: boolean;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    this.toggle = false;
  }

  toggleSidenav() {
    this.sidenavService.open();
  }
}
