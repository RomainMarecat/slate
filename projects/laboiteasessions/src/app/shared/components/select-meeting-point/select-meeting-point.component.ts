import { Component, OnInit } from '@angular/core';
import { MeetingPoint } from '../../interfaces/meeting-point';
import { ProfilService } from '../../services/profil.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select-meeting-point',
  templateUrl: './select-meeting-point.component.html',
  styleUrls: ['./select-meeting-point.component.scss']
})
export class SelectMeetingPointComponent implements OnInit {
  meetingPoints: MeetingPoint[];
  meetingPoint: MeetingPoint;

  constructor(private profilService: ProfilService) {
  }

  ngOnInit() {
    this.getMeetingPoints();
    this.getMeetingPoint();
  }

  getMeetingPoints() {
    this.profilService.meetingPoints
      .subscribe(meetingPoints => {
        if (meetingPoints) {
          this.meetingPoints = meetingPoints;
        }
      });
  }

  getMeetingPoint() {
    this.profilService.meetingPoint
      .subscribe(meetingPoint => {
        if (meetingPoint) {
          this.meetingPoint = meetingPoint;
        }
      });
  }

  isEqualTo(o1: MeetingPoint, o2: MeetingPoint): boolean {
    return o1 && o2 && o1.id === o2.id;
  }

  updateMeetingPoint(event: MatSelectChange) {
    this.profilService.announceMeetingPointChange(event.value as MeetingPoint);
  }
}
