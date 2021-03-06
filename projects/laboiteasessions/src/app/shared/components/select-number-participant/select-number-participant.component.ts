import { Component, OnInit } from '@angular/core';
import { OnlineSession } from '@romainmarecat/ngx-calendar';
import { ProfilService } from '../../services/profil.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select-number-participant',
  templateUrl: './select-number-participant.component.html',
  styleUrls: ['./select-number-participant.component.scss']
})
export class SelectNumberParticipantComponent implements OnInit {

  numberParticipants: number[] = [];
  numberParticipant: number;

  constructor(private profilService: ProfilService) {
  }

  ngOnInit(): void {
    this.getOnlineSession();
  }

  getOnlineSession() {
    this.profilService.onlineSession
      .subscribe((onlineSession: OnlineSession) => {
        if (!!onlineSession) {
          this.getNumberParticipants(onlineSession);
        }
      });
  }

  getNumberParticipants(onlineSession: OnlineSession) {
    this.numberParticipants = [];
    for (let i = 1; i <= onlineSession.max_persons; i++) {
      if (this.numberParticipants.indexOf(i) < 0) {
        this.numberParticipants.push(i);
      }
    }
    this.numberParticipant = this.numberParticipants[0];
  }

  updateNumberParticipant(event: MatSelectChange) {
    this.profilService.announceNumberParticipantChange(event.value);
  }
}


