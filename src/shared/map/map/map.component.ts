import { Component, Input, OnInit } from '@angular/core';
import { MapService } from '../shared/map.service';
import { Map } from '../shared/map';
import 'rxjs/add/operator/take';
import { AlertService } from '../../popup/alert.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [ './map.component.scss' ]
})
export class MapComponent implements OnInit {

  map: Map;

  @Input() mapConfig: any;

  constructor(private mapService: MapService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.mapService.getMaps()
      .take(1)
      .subscribe((maps) => {
        this.map = maps[ 0 ];
      }, (err) => {
        console.error(err);
      });
  }

}
