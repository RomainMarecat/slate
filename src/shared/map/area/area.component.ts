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
    const canvas: any = document.getElementById('map');
    // const ctx = canvas.getContext('2d');
    const ctx: CanvasRenderingContext2D = this.mapRef.nativeElement.getContext('2d');
    ctx.beginPath();
    this.areas.forEach((area) => {
      const p = new Path2D(area.path);
      ctx.fillStyle = 'rgb(61, 106, 190)';
      ctx.strokeStyle = 'rgb(30, 53, 125)';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.miterLimit = 10;

      ctx.fill(p);
      ctx.stroke(p);
    });

    canvas.addEventListener('click', e => {
      const bound = canvas.getBoundingClientRect();
      const x = e.pageX - bound.top;
      const y = e.pageY - bound.left;
      this.areas.forEach((area, index) => {
        if (ctx.isPointInPath(x, y)) {
          console.log(index);
        }
      });
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
