import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import * as moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/en-gb';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: [ './agenda.component.scss' ]
})
export class AgendaComponent implements OnInit {

  constructor(private i18nService: I18nService) {
  }

  ngOnInit() {
    let locale: string = this.i18nService.locale;

    if (locale === 'en') {
      locale = 'en-gb';
    }

    moment().locale(locale);
  }
}
