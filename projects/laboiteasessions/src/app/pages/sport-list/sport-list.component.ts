import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sport } from '../../shared/interfaces/sport';
import { SportService } from '../../shared/services/sport.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sport-list',
  templateUrl: './sport-list.component.html',
  styleUrls: ['./sport-list.component.scss']
})
export class SportListComponent implements OnInit {

  sports$: Observable<Sport[]> = this.sportService.getSports(0);
  locale: string = this.translateService.getBrowserLang();

  constructor(private sportService: SportService,
              private translateService: TranslateService) {
  }

  ngOnInit() {
  }

}
