import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { OnlineSession } from '@romainmarecat/ngx-calendar';
import { CartMonoItem } from '../../../pages/cart/shared/cart-item';
import { CartService } from '../../../pages/cart/shared/cart.service';
import { LoginComponent } from '../../../pages/security/login/login.component';
import { CityTeached } from '../../interfaces/city-teached';
import { EventType } from '../../interfaces/event';
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

  constructor(private onlineSessionService: OnlineSessionService,
              public dialog: MatDialog,
              private toastService: ToastService,
              private cartService: CartService,
              private authenticationService: AuthenticationService,
              private cityTeachedService: CityTeachedService,
              private sportTeachedService: SportTeachedService,
              private profilService: ProfilService,
              private sessionService: SessionService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.getUser();
    this.getMono();
    this.getSportTeached();
    this.getCityTeached();
    this.getCitiesTeached();
    this.getSportsTeached();
    this.getOnlineSessions();
    this.getOnlineSession();
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

  getCityTeached() {
    this.profilService.cityTeached
      .subscribe((cityTeached: CityTeached) => {
        this.cityTeached = cityTeached;
        this.loadOnlineSessionsBy(this.mono, this.sportTeached, this.cityTeached);
      });
  }

  getCitiesTeached() {
    this.profilService.citiesTeached
      .subscribe((citiesTeached: CityTeached[]) => {
        this.citiesTeached = citiesTeached;
      });
  }

  getSportTeached() {
    this.profilService.sportTeached
      .subscribe((sportTeached: SportTeached) => {
        this.sportTeached = sportTeached;
        this.loadOnlineSessionsBy(this.mono, this.sportTeached, this.cityTeached);
      });
  }

  getSportsTeached() {
    this.profilService.sportsTeached
      .subscribe((sportsTeached: SportTeached[]) => {
        this.sportsTeached = sportsTeached;
      });
  }

  getOnlineSessions() {
    this.profilService.onlineSessions
      .subscribe((onlineSessions: OnlineSession[]) => {
        this.onlineSessions = onlineSessions;
        this.profilService.announceOnlineSessionChange(this.onlineSessions[0]);
      });
  }

  getOnlineSession() {
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

  loadOnlineSessionsBy(mono: Mono, sportTeached?: SportTeached, cityTeached?: CityTeached) {
    if (mono && sportTeached && cityTeached) {
      this.onlineSessionService
        .getOnlineSessionsByCriteria({
          user: mono.id,
          sportTeached: sportTeached ? sportTeached.id : null,
          cityTeached: cityTeached ? cityTeached.id : null
        })
        .subscribe((onlineSessions: OnlineSession[]) => {
          this.profilService.announceOnlineSessionsChange(onlineSessions);
        }, () => {

        });
    }
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
    if (this.onlineSession
      && this.participantsNumber
      && this.onlineSession.price) {
      return parseFloat(((this.onlineSession.price * this.participantsNumber *
        this.fees / 100) + this.onlineSession.price * this.participantsNumber).toFixed(2));
    }
    return 0;
  }

  /* session has been sent by week calendar */
  addNewSession(session: Session) {
    if (session &&
      session.details
      && this.sportTeached &&
      this.cityTeached &&
      this.meetingPoint &&
      this.onlineSession &&
      this.participantsNumber) {
      session.details = {
        price: this.sessionPrice(),
        event_type: EventType.session,
        nb_persons: this.participantsNumber,
        sport: this.sportTeached.sport,
        city: this.cityTeached.city,
        meeting_point: this.meetingPoint,
        level: null,
        age: null
      };
      this.cartService.emitAddSession({mono: this.mono, item: session} as CartMonoItem);
    }
  }

  onSessionRemoved(event) {

  }

  onSessionAdded(session: Session) {
    if (!this.user) {
      this.dialog.open(LoginComponent)
        .afterClosed()
        .subscribe((closed) => {
          this.addSession(session);
        });
      return;
    }
    this.addSession(session);
  }

  addSession(session: Session) {
    console.log(session);
    session.city = this.cityTeached.city;
    session.sport = this.sportTeached.sport;
    session.speciality = null;
    session.meeting_point = this.meetingPoint;
    session.nb_persons = this.participantsNumber;
    session.online_session = this.onlineSession;

    this.sessionService.addSession(session).subscribe();
  }
}
