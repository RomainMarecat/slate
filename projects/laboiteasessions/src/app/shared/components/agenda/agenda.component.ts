import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { OnlineSession } from '@romainmarecat/ngx-calendar';
import { CartService } from '../../../pages/cart/shared/cart.service';
import { LoginComponent } from '../../../pages/security/login/login.component';
import { CityTeached } from '../../interfaces/city-teached';
import { MeetingPoint } from '../../interfaces/meeting-point';
import { Mono } from '../../interfaces/mono';
import { Session } from '../../interfaces/session';
import { SportTeached } from '../../interfaces/sport-teached';
import { User } from '../../interfaces/user';
import { AuthenticationService } from '../../services/authentication.service';
import { CityTeachedService } from '../../services/city-teached.service';
import { OnlineSessionService } from '../../services/online-session.service';
import { ProfilService } from '../../services/profil.service';
import { SessionService } from '../../services/session.service';
import { SportTeachedService } from '../../services/sport-teached.service';
import { ToastService } from '../../services/toast.service';
import { AppState } from '../../store/app.state';
import { selectUser } from '../../store/user/selectors/user.selector';
import { UserState } from '../../store/user/states/user.state';
import { SelectCityTeachedComponent } from '../select-city-teached/select-city-teached.component';
import { SelectSportTeachedComponent } from '../select-sport-teached/select-sport-teached.component';
import { SessionSummaryComponent } from '../session/session-summary/session-summary.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  @ViewChild(SelectSportTeachedComponent, {static: false}) selectSportTeachedComponent: SelectSportTeachedComponent;
  @ViewChild(SelectCityTeachedComponent, {static: false}) selectCityTeachedComponent: SelectCityTeachedComponent;

  mono: Mono;
  cityTeached: CityTeached;
  citiesTeached: CityTeached[] = [];
  sportsTeached: SportTeached[] = [];
  sportTeached: SportTeached;
  onlineSessions: OnlineSession[] = [];
  onlineSession: OnlineSession;
  meetingPoint: MeetingPoint;
  sessions: Session[] = [];
  participantsNumber = 1;
  fees = 2;
  viewMode = 'week';
  user: User;
  matDialogRef: MatDialogRef<SessionSummaryComponent>;

  constructor(private onlineSessionService: OnlineSessionService,
              private router: Router,
              public dialog: MatDialog,
              private toastService: ToastService,
              private cartService: CartService,
              private authenticationService: AuthenticationService,
              private cityTeachedService: CityTeachedService,
              private sportTeachedService: SportTeachedService,
              private profilService: ProfilService,
              private sessionService: SessionService,
              private matDialog: MatDialog,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.getUser();
    this.getMono();
    this.getCitiesTeached();
    this.getSportsTeached();
    this.getOnlineSessions();
    this.getSessions();
    this.getMeetingPoint();
  }

  getUser() {
    this.store.select(selectUser)
      .subscribe((userState: UserState) => this.user = userState.user as User);
  }

  getSessions() {
    this.profilService.sessions
      .subscribe(sessions => {
        if (sessions) {
          this.sessions = sessions;
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

  getMono() {
    this.profilService.mono
      .subscribe(mono => {
        if (mono) {
          this.mono = mono;
          this.loadSessions(mono);
        }
      });
  }

  getCitiesTeached() {
    this.profilService.citiesTeached
      .subscribe((citiesTeached: CityTeached[]) => {
        this.citiesTeached = citiesTeached;
      });

    this.profilService.cityTeached
      .subscribe((cityTeached: CityTeached) => {
        this.cityTeached = cityTeached;
        this.onlineSessionService.loadOnlineSessionsBy(this.mono, this.sportTeached, this.cityTeached);
      });
  }

  getSportsTeached() {
    this.profilService.sportsTeached
      .subscribe((sportsTeached: SportTeached[]) => {
        this.sportsTeached = sportsTeached;
      });

    this.profilService.sportTeached
      .subscribe((sportTeached: SportTeached) => {
        this.sportTeached = sportTeached;
        this.onlineSessionService.loadOnlineSessionsBy(this.mono, this.sportTeached, this.cityTeached);
      });
  }

  getOnlineSessions() {
    this.profilService.onlineSessions
      .subscribe((onlineSessions: OnlineSession[]) => {
        this.onlineSessions = onlineSessions;
        this.profilService.announceOnlineSessionChange(this.onlineSessions[0]);
      });
    this.profilService.onlineSession
      .subscribe((onlineSession: OnlineSession) => {
        this.onlineSession = onlineSession;
      });
  }

  loadSessions(user: User) {
    this.sessionService.getSessions(user)
      .subscribe((sessions) => {
        this.profilService.announceSessionsChange(sessions);
      });
  }

  onlineSessionChanged(onlineSession: OnlineSession) {
    this.profilService.announceOnlineSessionChange(onlineSession);
  }

  updateParticipantsNumber(number: number) {
    this.participantsNumber = number;
  }

  updateMeetingPoint(meetingPoint: MeetingPoint) {
    this.meetingPoint = meetingPoint;
  }

  sessionPrice(): number {
    return this.sessionService.getSessionPrice(this.onlineSession, this.participantsNumber, this.fees);
  }

  /* session has been sent by week calendar */
  addNewSession(session: Session) {
    if (this.sportTeached &&
      this.cityTeached &&
      this.meetingPoint &&
      this.onlineSession &&
      this.participantsNumber) {
      session = this.sessionService.addSessionFromCalendar(session,
        this.onlineSession,
        this.participantsNumber,
        this.fees,
        this.sportTeached,
        this.cityTeached,
        this.meetingPoint
      );
    }

    // Add cart update
  }

  onSessionRemoved(session: Session) {
    if (!this.user) {
      this.dialog.open(LoginComponent)
        .afterClosed()
        .subscribe((closed) => {
          this.removeSession(session);
        });
      return;
    }
    this.removeSession(session);
  }

  onSessionAdded(session: Session) {
    if (!this.user) {
      this.dialog.open(LoginComponent, {data: {showRegisterLink: true}})
        .afterClosed()
        .subscribe((closed) => {
          this.addSession(session);
        });
      return;
    }
    this.addSession(session);
  }

  removeSession(session: Session) {
    this.sessionService.removeSession(session).subscribe();
  }


  addSession(session: Session) {
    session.city = this.cityTeached.city;
    session.sport = this.sportTeached.sport;
    session.speciality = null;
    session.meeting_point = this.meetingPoint;
    session.nb_persons = this.participantsNumber;
    session.online_session = this.onlineSession;
    session.customers = null;

    this.sessionService.addSession(session).subscribe((newSession) => {
      if (newSession && newSession.user && newSession.user.id) {
        this.loadSessions(newSession.user);

        this.matDialogRef = this.matDialog.open(SessionSummaryComponent, {
          panelClass: 'session-summary',
          data: newSession
        });

        this.matDialogRef.afterClosed()
          .subscribe(result => {
            if (result) {
              this.router.navigate(['/cart']);
            }
          });
      }
    });
  }
}
