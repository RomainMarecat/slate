import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CartMonoItem } from '../../../pages/cart/shared/cart-item';
import { CartService } from '../../../pages/cart/shared/cart.service';
import { CityTeached } from '../../interfaces/city-teached';
import { EventType } from '../../interfaces/event';
import { MeetingPoint } from '../../interfaces/meeting-point';
import { Mono } from '../../interfaces/mono';
import { OnlineSession } from '../../interfaces/online-session';
import { Session } from '../../interfaces/session';
import { SportTeached } from '../../interfaces/sport-teached';
import { User } from '../../interfaces/user';
import { AuthenticationService } from '../../services/authentication.service';
import { CityTeachedService } from '../../services/city-teached.service';
import { OnlineSessionService } from '../../services/online-session.service';
import { ProfilService } from '../../services/profil.service';
import { SportTeachedService } from '../../services/sport-teached.service';
import { ToastService } from '../../services/toast.service';
import { SelectCityTeachedComponent } from '../select-city-teached/select-city-teached.component';
import { SelectSportTeachedComponent } from '../select-sport-teached/select-sport-teached.component';

@Component({
  selector: 'app-profil-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit, OnChanges {
  @ViewChild(SelectSportTeachedComponent, {static: false}) selectSportTeachedComponent: SelectSportTeachedComponent;
  @ViewChild(SelectCityTeachedComponent, {static: false}) selectCityTeachedComponent: SelectCityTeachedComponent;
  locale: string;
  _mono: Mono;

  @Input() cityTeached: CityTeached;
  @Input() citiesTeached: CityTeached[];
  @Input() sportsTeached: SportTeached[];
  @Input() sportTeached: SportTeached;

  onlineSessions: OnlineSession[] = [];
  onlineSession: OnlineSession;
  meetingPoint: MeetingPoint;

  participantsNumber = 1;

  fees = 2;
  viewMode = 'week';
  user: User;

  get mono(): Mono {
    return this._mono;
  }

  @Input('mono')
  set mono(value: Mono) {
    this._mono = value;
    this.loadSessions();
  }

  constructor(private onlineSessionService: OnlineSessionService,
              public dialog: MatDialog,
              private toastService: ToastService,
              private cartService: CartService,
              private authenticationService: AuthenticationService,
              private translateService: TranslateService,
              private cityTeachedService: CityTeachedService,
              private sportTeachedService: SportTeachedService,
              private profilService: ProfilService) {
  }

  ngOnInit() {
    this.locale = this.translateService.getBrowserLang();
    this.getSportTeached();
    this.getUser();
  }

  getUser() {
    this.authenticationService.getUser()
      .subscribe((user) => this.user = user);
  }

  getSportTeached() {
    this.profilService.sportTeachedAnnounced$
      .subscribe((sportTeached: SportTeached) => {
        this.sportTeached = sportTeached;
      });
  }

  loadSessions() {
    if (!!this.mono && this.mono.id) {
      this.loadCitiesTeachedByMono(this.mono);
    }

    if (!!this.mono && typeof this.mono.sports_teached !== 'undefined') {
      this.loadSportsTeachedByMono(this.mono);
    }
  }

  loadCitiesTeachedByMono(mono: Mono) {
    return this.cityTeachedService
      .getCitiesTeachedWithCitiesByUser(mono.id)
      .subscribe((citiesTeached: CityTeached[]) => {
        this.citiesTeached = citiesTeached;
      });
  }

  loadSportsTeachedByMono(mono: Mono) {
    this.sportTeachedService
      .getSportsTeachedWithSportsByAuth0Id(this.mono.id)
      .subscribe((sportsTeached: SportTeached[]) => {
        this.sportsTeached = sportsTeached;
      });
  }

  ngOnChanges() {
    if (!!this.mono && !!this.citiesTeached && !!this.sportsTeached) {
      if (!this.sportTeached) {
        this.sportTeached = this.sportsTeached[0];
      }
      if (!this.cityTeached) {
        this.cityTeached = this.citiesTeached[0];
      }
      this.loadOnlineSessions(this.mono, this.sportTeached, this.cityTeached);
    }
  }

  loadOnlineSessions(mono: Mono, sportTeached?: SportTeached, cityTeached?: CityTeached) {
    this.loadOnlineSessionsByMono({
      user_id: mono,
      sport_teached: sportTeached ? sportTeached : this.sportsTeached[0],
      city_teached: cityTeached ? cityTeached : this.citiesTeached[0]
    });
  }

  loadOnlineSessionsByMono(criteria: object) {
    this.onlineSessionService
      .getOnlineSessionsByCriteria(criteria)
      .subscribe((onlineSessions: OnlineSession[]) => {
        this.onlineSessions = onlineSessions;
        if (!onlineSessions || onlineSessions.length <= 0) {
          this.onlineSession = undefined;
        }
        if (!this.onlineSession && onlineSessions && onlineSessions.length > 0) {
          this.onlineSession = onlineSessions[0];
        }
        return onlineSessions;
      }, (error) => {
        this.toastService.emitToast({
          message: this.translateService.instant('profil.online_sessions.error'),
          classes: 'red'
        });
        return [];
      });
  }

  onlineSessionChanged(onlineSession: OnlineSession) {
    this.onlineSession = onlineSession;
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
      && this.onlineSession.prices[this.participantsNumber - 1]) {
      return parseFloat(((this.onlineSession.prices[this.participantsNumber - 1] *
        this.fees / 100) + this.onlineSession.prices[this.participantsNumber - 1]).toFixed(2));
    }
    return 0;
  }

  /* session has been sent by week calendar */
  addnewSession(session: Session) {
    if (session && session.details
      && this.sportTeached && this.cityTeached && this.meetingPoint
      && this.onlineSession && this.participantsNumber) {
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

  onSessionRemoved($event: Session) {

  }

  onSessionAdded($event: Session) {

  }
}
