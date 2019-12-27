import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { CityTeached } from '../../interfaces/city-teached';
import { ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-profil-agenda-select-city-teached',
  templateUrl: './select-city-teached.component.html',
  styleUrls: ['./select-city-teached.component.scss']
})
export class SelectCityTeachedComponent implements OnChanges {

  @Input() citiesTeached: CityTeached[];
  @Input() cityTeached: CityTeached;

  @Output() cityTeachedChange: EventEmitter<CityTeached> = new EventEmitter<CityTeached>();
  selectedCityTeached: CityTeached;

  constructor(private profilService: ProfilService) {
  }

  ngOnChanges() {
    if (!!this.citiesTeached && this.citiesTeached.length > 0) {
      this.selectedCityTeached = this.citiesTeached[0];
      if (this.cityTeached) {
        this.citiesTeached.forEach((cityT) => {
          if (this.cityTeached.id === cityT.id) {
            this.selectedCityTeached = cityT;
          }
        });
      }
    }
  }

  updateCityTeached(event: MatSelectChange) {
    this.cityTeachedChange.emit(event.value as CityTeached);
    this.profilService.announceCityTeachedChange(event.value as CityTeached);
  }
}
