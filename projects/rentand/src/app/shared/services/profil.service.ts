import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CityTeached } from '../interfaces/city-teached';
import { SportTeached } from '../interfaces/sport-teached';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  /* Observable */
  private sportTeachedSource = new Subject<SportTeached>();
  private cityTeachedSource = new Subject<CityTeached>();

  sportTeachedAnnounced$ = this.sportTeachedSource.asObservable();
  cityTeachedAnnounced$ = this.cityTeachedSource.asObservable();

  cityTeached: CityTeached;
  sportTeached: SportTeached;

  getCityTeached() {
    return this.cityTeached;
  }

  getSportTeached() {
    return this.sportTeached;
  }

  announceCityTeachedChange(cityTeached: CityTeached) {
    this.cityTeached = cityTeached;
    this.cityTeachedSource.next(cityTeached);
  }

  announceSportTeachedChange(sportTeached: SportTeached) {
    if (sportTeached !== this.sportTeached) {
      this.sportTeached = sportTeached;
      this.sportTeachedSource.next(sportTeached);
    }
  }
}
