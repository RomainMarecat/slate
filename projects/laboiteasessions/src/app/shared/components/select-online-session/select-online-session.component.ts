import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewRef } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { OnlineSession } from '@romainmarecat/ngx-calendar';
import * as _moment from 'moment';
import { ProfilService } from '../../services/profil.service';

const moment = _moment;

@Component({
  selector: 'app-select-online-session',
  templateUrl: './select-online-session.component.html',
  styleUrls: ['./select-online-session.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectOnlineSessionComponent implements OnInit {

  onlineSessions: OnlineSession[] = [];

  onlineSession: OnlineSession;

  constructor(private profilService: ProfilService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getOnlineSessions();
    this.getOnlineSession();
  }

  getOnlineSession() {
    this.profilService.onlineSession
      .subscribe((onlineSession: OnlineSession) => {
        this.onlineSession = onlineSession;
      });
  }

  detectChanges() {
    if (!(this.changeDetectorRef as ViewRef).destroyed) {
      this.changeDetectorRef.detectChanges();
    }
  }

  getOnlineSessions() {
    this.profilService.onlineSessions
      .subscribe((onlineSessions: OnlineSession[]) => {
        this.onlineSessions = onlineSessions
          .filter((o) => o.name)
          .map((onlineSession: OnlineSession) => {
            onlineSession.name = onlineSession.name.concat(
              ' - ',
              moment.duration(
                onlineSession.duration,
                'minutes'
              ).humanize()
            );
            return onlineSession;
          });

        if (!(this.changeDetectorRef as ViewRef).destroyed) {
          this.detectChanges();
        }
      });
  }

  isEqualTo(o1: OnlineSession, o2: OnlineSession): boolean {
    return o1 && o2 && o1.id === o2.id;
  }

  updateOnlineSession(event: MatSelectChange) {
    this.profilService.announceOnlineSessionChange(event.value);
  }
}
