import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-select-nationality',
  templateUrl: './select-nationality.component.html',
  styleUrls: ['./select-nationality.component.scss'],
})
export class SelectNationalityComponent implements OnInit {

  @Input() placeholder = 'Enter your nationality';

  @Input() parentForm: FormGroup;

  @Input() formInnerControlName: string;

  countryList: Country[];

  locale = 'fr';

  constructor(private countryService: CountryService,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.locale = this.translateService.getBrowserLang();
    this.countryService.getCountries()
      .subscribe((countries) => {
        this.countryList = countries;
      });
  }

  isEqualTo(o1: Country, o2: Country): boolean {
    return o1.id === o2.id;
  }
}
