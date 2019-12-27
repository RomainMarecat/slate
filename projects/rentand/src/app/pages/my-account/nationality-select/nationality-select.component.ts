import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CountryService } from '../../../shared/services/country.service';

@Component({
  selector: 'app-nationality-select',
  templateUrl: './nationality-select.component.html',
  styleUrls: ['./nationality-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NationalitySelectComponent),
      multi: true
    }
  ]
})
export class NationalitySelectComponent implements OnInit {

  countryList: any[];
  hasBeenInit = false;
  mediumScreenAndDown = true;
  locale = 'en';
  defaultNationality = 'fr';

  constructor(private countryService: CountryService,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.locale = this.translateService.getBrowserLang();
    this.countryService.getCountries().subscribe((countries) => {
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
