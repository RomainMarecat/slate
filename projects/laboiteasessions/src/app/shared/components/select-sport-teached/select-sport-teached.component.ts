import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SportTeached } from '../../interfaces/sport-teached';
import { ProfilService } from '../../services/profil.service';
import { MatSelectChange } from '@angular/material/select';

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

  ngOnChanges(changes: {sportsTeached: SimpleChange, sportTeached: SimpleChange}) {
    if (!!changes.sportsTeached && !!changes.sportsTeached.currentValue && changes.sportsTeached.currentValue.length > 0) {
      this.selectSportTeached();
      this.changeSportTeached(this.selectedSportTeached);
    }
  }

  selectSportTeached() {
    this.selectedSportTeached = this.sportsTeached[0];
    if (this.sportTeached) {
      this.selectRightSportTeached();
    }
  }

  selectRightSportTeached() {
    for (const i in this.sportsTeached) {
      if (this.sportTeached.id === this.sportsTeached[i].id) {
        this.selectedSportTeached = this.sportsTeached[i];
      }
    }
  }

  changeSportTeached(sportTeached: SportTeached) {
    this.profilService.announceSportTeachedChange(sportTeached);
  }

  updateSportTeached(event: MatSelectChange) {
    const sportTeached = event.value as SportTeached;

    this.changeSportTeached(sportTeached);
    this.sportTeachedChange.emit(sportTeached);
  }
}
