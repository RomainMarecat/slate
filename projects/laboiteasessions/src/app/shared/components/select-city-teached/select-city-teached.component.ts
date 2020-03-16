import { Component, OnInit } from '@angular/core';
import { CityTeached } from '../../interfaces/city-teached';
import { ProfilService } from '../../services/profil.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select-city-teached',
  templateUrl: './select-city-teached.component.html',
  styleUrls: ['./select-city-teached.component.scss']
})
export class SelectCityTeachedComponent implements OnInit {

  citiesTeached: CityTeached[];
  cityTeached: CityTeached;

  constructor(private profilService: ProfilService) {
  }

  ngOnInit(): void {
    this.getCitiesTeached();
    this.getCityTeached();
  }

  getCityTeached() {
    this.profilService.cityTeached
      .subscribe((cityTeached: CityTeached) => {
        this.cityTeached = cityTeached;
      });
  }

  getCitiesTeached() {
    this.profilService.citiesTeached
      .subscribe((citiesTeached: CityTeached[]) => {
        this.citiesTeached = citiesTeached;
      });
  }

  isEqualTo(o1: CityTeached, o2: CityTeached): boolean {
    return o1 && o2 && o1.id === o2.id;
  }

  updateCityTeached(event: MatSelectChange) {
    this.profilService.announceCityTeachedChange(event.value as CityTeached);
  }
}
