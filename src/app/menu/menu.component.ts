import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'clothing-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() sidenavEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  toggle: boolean;

  constructor() { }

  ngOnInit() {
    this.toggle = false;
  }

  toggleSidenav() {
    this.sidenavEmitter.emit(!this.toggle);
  }

}
