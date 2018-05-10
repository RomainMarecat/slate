import { Component, OnInit } from '@angular/core';
import { Session } from '../shared/session';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: [ './calendar.component.scss' ]
})
export class CalendarComponent implements OnInit {
  viewMode: String;

  constructor() {
  }

  ngOnInit() {
    this.setDefaultViewMode();
  }

  setDefaultViewMode() {
    this.viewMode = 'week';
    // if (this.deviceService.isMaterializeMediumOnly()) {
    //   this.viewMode = '3days';
    // } else if (this.deviceService.isMaterializeSmallAndDown()) {
    //   this.viewMode = 'day';
    // }
  }

  onViewModeChanged(viewMode: String) {
    this.viewMode = viewMode;
  }

  onSessionRemoved(event: Session) {

  }

  onSessionAdded(event: any) {

  }
}
