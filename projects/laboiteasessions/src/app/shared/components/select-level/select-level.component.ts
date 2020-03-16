import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Parameter } from '../../interfaces/parameter';
import { ParameterService } from '../../parameter/parameter.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select-level',
  templateUrl: './select-level.component.html',
  styleUrls: ['./select-level.component.scss']
})
export class SelectLevelComponent implements OnInit {

  @Output() levelChanged: EventEmitter<Parameter> = new EventEmitter<Parameter>();
  locale: string;

  levels: Parameter[];

  constructor(private translateService: TranslateService,
              private parameterService: ParameterService) {
  }

  ngOnInit() {
    this.locale = this.translateService.getBrowserLang();
    this.loadLevels();
  }

  loadLevels() {
    this.levels = this.parameterService.getParameters('level');
  }

  updateLevel(event: MatSelectChange) {
    const level = event.value as Parameter;
    this.levelChanged.emit(level);
  }

}
