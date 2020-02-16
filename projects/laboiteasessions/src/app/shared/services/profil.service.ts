import { Injectable } from '@angular/core';
import { OnlineSession } from '@romainmarecat/ngx-calendar';
import { BehaviorSubject } from 'rxjs';
import { CityTeached } from '../interfaces/city-teached';
import { MeetingPoint } from '../interfaces/meeting-point';
import { Mono } from '../interfaces/mono';
import { Session } from '../interfaces/session';
import { SportTeached } from '../interfaces/sport-teached';
import { Sport } from '../interfaces/sport';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  mono: BehaviorSubject<Mono> = new BehaviorSubject<Mono>(null);

  sportsTeached: BehaviorSubject<SportTeached[]> = new BehaviorSubject<SportTeached[]>([]);
  sportTeached: BehaviorSubject<SportTeached> = new BehaviorSubject<SportTeached>(null);

  sport: BehaviorSubject<Sport> = new BehaviorSubject<Sport>(null);

  cityTeached: BehaviorSubject<CityTeached> = new BehaviorSubject<CityTeached>(null);
  citiesTeached: BehaviorSubject<CityTeached[]> = new BehaviorSubject<CityTeached[]>([]);

  meetingPoints: BehaviorSubject<MeetingPoint[]> = new BehaviorSubject<MeetingPoint[]>([]);
  meetingPoint: BehaviorSubject<MeetingPoint> = new BehaviorSubject<MeetingPoint>(null);

  onlineSessions: BehaviorSubject<OnlineSession[]> = new BehaviorSubject<OnlineSession[]>([]);
  onlineSession: BehaviorSubject<OnlineSession> = new BehaviorSubject<OnlineSession>(null);

  numberParticipant: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  sessions: BehaviorSubject<Session[]> = new BehaviorSubject<Session[]>([]);

  announceCityTeachedChange(cityTeached: CityTeached) {
    this.cityTeached.next(cityTeached);
  }

  announceCitiesTeachedChange(citiesTeached: CityTeached[]) {
    this.citiesTeached.next(citiesTeached);
  }

  announceSportTeachedChange(sportTeached: SportTeached) {
    this.sportTeached.next(sportTeached);
  }

  announceSportChange(sport: Sport) {
    this.sport.next(sport);
  }

  announceSportsTeachedChange(sportsTeached: SportTeached[]) {
    this.sportsTeached.next(sportsTeached);
  }

  announceOnlineSessionsChange(onlineSessions: OnlineSession[]) {
    this.onlineSessions.next(onlineSessions);
  }

  announceOnlineSessionChange(onlineSession: OnlineSession) {
    this.onlineSession.next(onlineSession);
  }

  announceMonoChange(mono: Mono) {
    this.mono.next(mono);
  }

  announceSessionsChange(sessions: Session[]) {
    this.sessions.next(sessions);
  }

  announceMeetingPointChange(meetingPoint: MeetingPoint) {
    this.meetingPoint.next(meetingPoint);
  }

  announceMeetingPointsChange(meetingPoints: MeetingPoint[]) {
    this.meetingPoints.next(meetingPoints);
  }

  announceNumberParticipantChange(meetingPoints: MeetingPoint[]) {
    this.meetingPoints.next(meetingPoints);
  }
}
