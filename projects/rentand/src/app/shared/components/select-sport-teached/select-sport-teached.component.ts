import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { SportTeached } from '../../interfaces/sport-teached';
import { ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-profil-agenda-select-sport-teached',
  templateUrl: './select-sport-teached.component.html',
  styleUrls: ['./select-sport-teached.component.scss']
})
export class SelectSportTeachedComponent implements OnInit, OnChanges {

  @Input() sportsTeached: SportTeached[];
  @Input() sportTeached: SportTeached;
  @Output() sportTeachedChange: EventEmitter<SportTeached> = new EventEmitter<SportTeached>();
  locale: string;

  selectedSportTeached: SportTeached;

  constructor(private translateService: TranslateService,
              private profilService: ProfilService) {
  }

  ngOnInit() {
    this.locale = this.translateService.getBrowserLang();
  }

  ngOnChanges(changes: any) {
    if (!!this.sportsTeached && this.sportsTeached.length > 0) {
      this.selectedSportTeached = this.sportsTeached[0];
      if (this.sportTeached) {
        for (const i in this.sportsTeached) {
          if (this.sportTeached.id === this.sportsTeached[i].id) {
            this.selectedSportTeached = this.sportsTeached[i];
          }
        }
      }
      this.profilService.announceSportTeachedChange(this.selectedSportTeached);
    }
  }

  updateSportTeached(event: MatSelectChange | any) {
    const sportTeached = event.value as SportTeached;
    this.profilService.announceSportTeachedChange(sportTeached);
    this.sportTeachedChange.emit(sportTeached);
  }
}
