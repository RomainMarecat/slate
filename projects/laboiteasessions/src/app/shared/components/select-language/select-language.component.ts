import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../interfaces/language';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {
  @Input() panelClass: string;
  @Input() nullable: boolean;
  @Input() appearance = 'outline';
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
    return o1 && o2 && o1.id === o2.id;
  }
}
