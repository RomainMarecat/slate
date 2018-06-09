import { Component, Input, OnInit } from '@angular/core';
import { MapService } from '../shared/map.service';
import { Map } from '../shared/map';
import { AlertService } from '../../popup/alert.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map: Map;

  /**
   * Input mapconfig
   */
  @Input() mapConfig: any;

  /**
   *
   * @param {MapService} mapService
   * @param {AlertService} alertService
   */
  constructor(private mapService: MapService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.mapService.getMaps()
      .pipe(take(1))
      .subscribe((maps) => {
        this.map = maps[0];
      }, (err) => {
        console.error(err);
      });
  }
}
