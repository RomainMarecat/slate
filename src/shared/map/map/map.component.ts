import { Component, Input, OnInit } from '@angular/core';
import { MapService } from '../shared/map.service';
import { Map } from '../shared/map';
import { AlertService } from '../../popup/alert.service';

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
  @Input() mapConfig = {
    context: {
      path: {
        fillStyle: '#3a435e',
        strokeStyle: '#393d3f'
      },
      hovered: {
        fillStyle: '#e71d36',
        strokeStyle: '#393d3f'
      }
    }
  };

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
      .subscribe((maps) => {
        this.map = maps[0];
      }, (err) => {
        this.alertService.show(err);
      });
  }
}
