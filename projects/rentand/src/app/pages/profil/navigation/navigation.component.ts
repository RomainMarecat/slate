import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Mono } from '../../../shared/interfaces/mono';
import { SportTeached } from '../../../shared/interfaces/sport-teached';
import { UserService } from '../../../shared/services/user.service';
import { ProfilService } from '../../../shared/services/profil.service';

@Component({
  selector: 'app-profil-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {

  locale: string;
  translatedSportTeached: string;
  mono: Mono;

  constructor(private translateService: TranslateService,
              private profilService: ProfilService,
              private userService: UserService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.locale = this.translateService.getBrowserLang();
    this.userService.mono$.subscribe((mono) => {
      this.mono = mono;
      this.changeDetectorRef.detectChanges();
    });
    this.getSportTeached();
  }

  getSportTeached() {
    this.profilService.sportTeached.asObservable()
      .subscribe((sportTeached: SportTeached) => {
        this.translatedSportTeached = this.getTranslation(sportTeached);
        this.changeDetectorRef.detectChanges();
      });
  }

  getTranslation(sportTeached: SportTeached): string {
    return sportTeached && sportTeached.sport && sportTeached.sport.translations &&
    sportTeached.sport.translations[this.locale] ? sportTeached.sport.translations[this.locale] : null;
  }
}
