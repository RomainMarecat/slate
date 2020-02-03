import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../interfaces/language';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-simple-select',
  templateUrl: './language-simple-select.component.html',
  styleUrls: ['./language-simple-select.component.scss']
})
export class LanguageSimpleSelectComponent implements OnInit {

  @Input() placeholder = 'Enter your language';
  languageList: Language[];
  locale = 'fr';

  @Input() parentForm: FormGroup;
  @Input() formInnerControlName: string;

  constructor(private languageService: LanguageService,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.locale = this.translateService.getBrowserLang();
    this.languageService.getLanguages()
      .subscribe((languages) => {
        this.languageList = languages;
      });
  }


  isEqualTo(o1: Language, o2: Language): boolean {
    return o1.id === o2.id;
  }
}
