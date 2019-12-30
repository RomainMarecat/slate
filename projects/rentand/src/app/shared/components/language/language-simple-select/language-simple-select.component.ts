import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-language-simple-select',
  templateUrl: './language-simple-select.component.html',
  styleUrls: ['./language-simple-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LanguageSimpleSelectComponent),
      multi: true
    }
  ]
})
export class LanguageSimpleSelectComponent implements OnInit {

  languageList: any[];
  hasBeenInit = false;
  mediumScreenAndDown = true;
  locale = 'en';
  defaultLanguage = 'fr';

  constructor(private languageService: LanguageService, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.locale = this.translateService.getBrowserLang();
    this.languageService.getLanguages().subscribe((languages) => {
      this.languageList = languages;
    });
  }

  writeValue(value: any) {
    this.defaultLanguage = value;
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

  onLanguageChange(event: any) {
    if (event && event.value) {
      this.propagateChange(event.value);
    }
  }
}