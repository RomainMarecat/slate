import { Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AreaService } from '../shared/area.service';
import { Area } from '../shared/area';
import { Map } from '../shared/map';
import { Filter } from '../../facet/filter/shared/filter';
import { take } from 'rxjs/operators';
import { AreaDrawComponent } from '../area-draw/area-draw.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: [ './area.component.scss' ]
})
export class AreaComponent implements OnInit {
  @ViewChild(AreaDrawComponent) areaDrawComponent: AreaDrawComponent;
  areas: Area[] = [];
  _map: Map;

  constructor(private areaService: AreaService) {
  }

  ngOnInit() {
  }

  getAreas(map: Map) {
    const filters: Filter[] = [ {
      column: 'map',
      operator: '==',
      value: map.key
    } ];
    this.areaService.filters$.next(filters);
    this.areaService.getAreas()
      .subscribe((areas: Area[]) => {
        this.areas = areas;
      });
  }

  @Input() set map(map: Map) {
    if (map) {
      this._map = map;
      this.getAreas(map);
    }
  }

  get map(): Map {
    return this._map;
  }

  onHoveredArea(area: Area) {
    this.areaDrawComponent.drawHoveredArea(area);
  }
}
