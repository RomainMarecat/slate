import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as _moment from 'moment';
import { Mono } from '../../../shared/interfaces/mono';
import { Parameter } from '../../../shared/interfaces/parameter';
import { SportTeached } from '../../../shared/interfaces/sport-teached';
import { ParameterService } from '../../../shared/parameter/parameter.service';
import { CountryService } from '../../../shared/services/country.service';
import { ProfilService } from '../../../shared/services/profil.service';

const moment = _moment;

@Component({
  selector: 'app-profil-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  locale: string;
  mono: Mono;
  sportsTeached: SportTeached[];
  demonym: string;
  sportTeached: SportTeached;

  constructor(private translateService: TranslateService,
              private parameterService: ParameterService,
              private countryService: CountryService,
              private profilService: ProfilService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.locale = this.translateService.getBrowserLang();

    this.getSportTeached();

    this.getSportsTeached();

    this.getMono();
  }

  detectChanges() {
    if (!(this.changeDetectorRef as ViewRef).destroyed) {
      this.changeDetectorRef.detectChanges();
    }
  }

  getSportsTeached() {
    this.profilService.sportsTeached.asObservable()
      .subscribe(sportsTeached => {
        this.sportsTeached = sportsTeached;
        this.detectChanges();
      });
  }

  getMono() {
    this.profilService.mono.asObservable()
      .subscribe(mono => {
        this.mono = mono;

        this.addAge();
        if (this.mono && this.mono.user_metadata && this.mono.user_metadata.nationality) {
          this.getCountryDemonym(this.mono.user_metadata.nationality);
        }

        this.detectChanges();
      });
  }

  getSportTeached() {
    this.profilService.sportTeached.asObservable()
      .subscribe((sportTeached: SportTeached) => {
        this.sportTeached = sportTeached;
        this.detectChanges();
      });
  }

  addAge() {
    if (!!this.mono &&
      typeof this.mono.user_metadata !== 'undefined' &&
      typeof this.mono.user_metadata.birthday !== 'undefined') {
      const birth = moment(this.mono.user_metadata.birthday, 'DD/MM/YYYY');
      this.mono.age = moment().diff(birth, 'years');
      this.detectChanges();
    }
  }

  getLevelParametersTitle(levels: number[]): string {
    let str = '';
    levels.forEach((level) => {
      const parameter: Parameter = this.parameterService.getLevelParameter(level);
      str = str + (parameter && parameter.translations && parameter.translations[this.locale] ?
        parameter.translations[this.locale] : '') + ', ';
    });
    str = str.slice(0, -2);
    str += '.';
    return str;
  }

  getAgeParameterTitle(ages: number[]): string {
    let str = '';
    ages.forEach(age => {
      const parameter: Parameter = this.parameterService.getAgeParameter(age);
      str = str + (parameter && parameter.translations && parameter.translations[this.locale] ?
        parameter.translations[this.locale] : '') + ', ';
    });
    str = str.slice(0, -2);
    str += '.';
    return str;
  }

  getCountryDemonym(nationality: string) {
    this.countryService.getCountry(nationality)
      .subscribe((country) => {
        if (country && country.demonym && country.demonym[this.locale]) {
          this.demonym = country.demonym[this.locale];
        } else {
          this.demonym = nationality;
        }
        this.detectChanges();
      }, (error) => {
        this.demonym = nationality;
      });
  }
}
