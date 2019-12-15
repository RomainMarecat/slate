import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { MeetingPoint } from '../../interfaces/meeting-point';

@Component({
  selector: 'app-select-meeting-point',
  templateUrl: './select-meeting-point.component.html',
  styleUrls: ['./select-meeting-point.component.scss']
})
export class SelectMeetingPointComponent implements OnInit, OnChanges {

  @Output() meetingPointChanged: EventEmitter<MeetingPoint> = new EventEmitter<MeetingPoint>();
  locale: string;

  @Input() meetingPoints: MeetingPoint[];
  selectedMeetingPoint: MeetingPoint;

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
    this.locale = this.translateService.getBrowserLang();
  }

  ngOnChanges() {
    if (this.meetingPoints && this.meetingPoints.length > 0) {
      this.selectedMeetingPoint = this.meetingPoints[0];
      this.meetingPointChanged.emit(this.selectedMeetingPoint);
    } else {
      this.selectedMeetingPoint = undefined;
      this.meetingPointChanged.emit(this.selectedMeetingPoint);
    }
  }

  updateMeetingPoint(event: MatSelectChange | any) {
    const meetingPoint = event.value as MeetingPoint;
    this.meetingPointChanged.emit(meetingPoint);
  }
}
