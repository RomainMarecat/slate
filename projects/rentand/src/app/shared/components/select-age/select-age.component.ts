import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Parameter } from '../../interfaces/parameter';
import { ParameterService } from '../../parameter/parameter.service';

@Component({
  selector: 'app-select-age',
  templateUrl: './select-age.component.html',
  styleUrls: ['./select-age.component.scss']
})
export class SelectAgeComponent implements OnInit {

  @Output() ageChanged: EventEmitter<Parameter> = new EventEmitter<Parameter>();
  locale: string;

  ages: Parameter[];

  constructor(private translateService: TranslateService,
              private parameterService: ParameterService) {
  }

  ngOnInit() {
    this.locale = this.translateService.getBrowserLang();
    this.loadAges();
  }

  loadAges() {
    this.ages = this.parameterService.getParameters('age');
  }

  updateAge(event: MatSelectChange | any) {
    const age = event.value as Parameter;
    this.ageChanged.emit(age);
  }

}
