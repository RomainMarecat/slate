import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Session } from '@romainmarecat/ngx-calendar';
import { TranslateService } from '@ngx-translate/core';
import * as moment_ from 'moment';

const moment = moment_;

@Component({
  selector: 'app-session-summary',
  templateUrl: './session-summary.component.html',
  styleUrls: ['./session-summary.component.scss']
})
export class SessionSummaryComponent {

  locale = this.translateService.getBrowserLang();

  constructor(@Inject(MAT_DIALOG_DATA) public session: Session,
              private translateService: TranslateService) {
  }

  getSessionDuration(duration: number): string {
    return moment.duration(duration, 'minutes').humanize();
  }
}
