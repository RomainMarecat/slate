import { Component, OnInit } from '@angular/core';
import { Session } from '../shared/session';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: [ './calendar.component.scss' ]
})
export class CalendarComponent implements OnInit {
  viewMode: String;
  slotDuration: number;

  constructor() {
  }

  ngOnInit() {
    this.setDefaultViewMode();
    this.setDefaultSlotDuration();
  }

  setDefaultViewMode() {
    this.viewMode = 'week';
    // if (this.deviceService.isMaterializeMediumOnly()) {
    //   this.viewMode = '3days';
    // } else if (this.deviceService.isMaterializeSmallAndDown()) {
    //   this.viewMode = 'day';
    // }
  }

  setDefaultSlotDuration() {
    this.slotDuration = 60;
  }

  onViewModeChanged(viewMode: String) {
    this.viewMode = viewMode;
  }

  onSessionRemoved(event: Session) {

  }

  onSessionAdded(event: any) {

  }
}
