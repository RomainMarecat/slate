import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AreaService } from '../shared/area.service';
import { Area } from '../shared/area';
import { Map } from '../shared/map';
import { Filter } from '../../facet/filter/shared/filter';
import { take } from 'rxjs/operators';
import { Path2DConstructor } from '../shared/path2d';

declare var Path2D: Path2DConstructor;

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: [ './area.component.scss' ]
})
export class AreaComponent implements OnInit {
  @ViewChild('map') mapRef: ElementRef;

  areas: Area[] = [];
  _map: Map;
  width = 600;
  height = 550;

  style = {
    fill: '#ddd',
    stroke: '#aaa',
    'stroke-width': 1,
    'stroke-linejoin': 'round',
    cursor: 'pointer'
  };

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
      .take(1)
      .subscribe((areas: Area[]) => {
        this.areas = areas;
        this.paintAreas();
      });
  }

  /**
   * Draw all lines with path2D
   */
  paintAreas() {
    const ctx: CanvasRenderingContext2D =
      this.mapRef.nativeElement.getContext('2d');
    ctx.beginPath();
    this.areas.forEach((area) => {
      const p = new Path2D(area.path);
      ctx.fillStyle = 'blue';
      ctx.strokeStyle = '#131629';
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';

      ctx.fill(p);
      ctx.stroke(p);
    });

    ctx.closePath();
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
}
