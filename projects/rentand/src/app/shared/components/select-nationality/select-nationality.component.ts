import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-select-nationality',
  templateUrl: './select-nationality.component.html',
  styleUrls: ['./select-nationality.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectNationalityComponent),
      multi: true
    }
  ]
})
export class SelectNationalityComponent implements OnInit {

  @Input() placeholder = 'Enter your nationality';

  countryList: Country[];

  locale = 'en';

  defaultNationality = 'fr';

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

  writeValue(value: any) {
    this.defaultNationality = value;
  }

  propagateChange = (_: any) => {
  }

  validateFn: any = () => {
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
  }

  onNationalityChange(event: any) {
    if (event && event.value) {
      this.propagateChange(event.value);
    }
  }
}
