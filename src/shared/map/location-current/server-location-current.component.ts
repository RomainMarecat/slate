import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UniversalService } from '../../universal/universal.service';
import { MapService } from '../shared/map.service';

@Component({
  selector: 'app-map-location-current',
  template: ``
})
export class ServerLocationCurrentComponent {

  @Input() mapConfig;

  constructor(private mapService: MapService,
              public universalService: UniversalService,
              private translateService: TranslateService) {
  }
}
