import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { City } from '../../interfaces/city';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss']
})
export class SelectCityComponent implements OnInit {
  filteredCities: Observable<City[]>;
  cities: City[] = [];
  @Input() parentForm: FormGroup;
  @Input() formInnerControlName: string;

  constructor(private cityService: CityService) {
  }

  ngOnInit() {
    if (this.parentForm && this.parentForm.get(this.formInnerControlName)) {
      this.filteredCities = this.parentForm.get(this.formInnerControlName).valueChanges
        .pipe(
          debounceTime(500),
          switchMap((keywords => {
            return this.getCityByKeywords(keywords);
          }))
        );
    }
  }

  getCityByKeywords(keywords: string): Observable<City[]> {
    if (keywords && typeof keywords === 'string') {
      return this.cityService.getCityByName(keywords);
    }
    return of([]);
  }

  handleChoice(city) {
    if (city) {
      return city.name;
    }
  }
}
