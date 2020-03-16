import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Sport } from '../../interfaces/sport';
import { ProfilService } from '../../services/profil.service';
import { SportService } from '../../services/sport.service';
import { Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select-sport',
  templateUrl: './select-sport.component.html',
  styleUrls: ['./select-sport.component.scss']
})
export class SelectSportComponent implements OnInit, OnChanges {
  @Input() panelClass: string;
  @Input() appearance = 'outline';
  @Input() sports: Sport[];
  sports$: Observable<Sport[]>;
  @Input() sport: Sport;
  @Input() parent: Sport;
  @Output() sportChange: EventEmitter<Sport> = new EventEmitter<Sport>();
  locale: string;
  @Input() level: number;
  selectedSport: Sport;

  constructor(private translateService: TranslateService,
              private sportService: SportService,
              private profilService: ProfilService) {
  }

  ngOnInit() {
    this.locale = this.translateService.getBrowserLang();
    this.getSports();
  }

  ngOnChanges(changes: any) {
    // if (!!this.sports && this.sports.length > 0) {
    //   this.selectSport();
    //   this.changeSport(this.selectedSport);
    // }
  }

  getSports() {
    this.sports$ = this.sportService.sportsLevels$.get(this.level);
  }

  selectSport() {
    this.selectedSport = this.sports[0];
    if (this.sport) {
      this.selectRightSport();
    }
  }

  selectRightSport() {
    for (const i in this.sports) {
      if (this.sport.id === this.sports[i].id) {
        this.selectedSport = this.sports[i];
      }
    }
  }

  changeSport(sport: Sport) {
    this.profilService.announceSportChange(this.selectedSport);
  }

  updateSport(event: MatSelectChange) {
    const sport = event.value as Sport;
    this.sportService.announceSportLevelChange(this.level, sport);
    this.profilService.announceSportChange(sport);
    this.sportChange.emit(sport);
  }
}
