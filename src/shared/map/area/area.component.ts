import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AreaService } from '../shared/area.service';
import { Area } from '../shared/area';
import { Map } from '../shared/map';
import { Filter } from '../../facet/filter/shared/filter';
import { take } from 'rxjs/operators';
import { Path2DConstructor } from '../shared/path2d';
import { Router } from '@angular/router';

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

  constructor(private areaService: AreaService, private router: Router) {
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
    const context: CanvasRenderingContext2D = this.mapRef.nativeElement.getContext('2d');
    const paths = [];
    this.areas.forEach((area: Area, index: number) => {
      const path2D = new Path2D(area.path);
      this.drawArea(context, path2D);

      paths.push({area: area, path2D: path2D});
    });

    /**
     * The mousemove eventlooks after changing the pointer to the
     * hand and back.
     */
    canvas.addEventListener('mousemove', (e: MouseEvent) => {
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;

      this.mapRef.nativeElement.style.cursor = 'default';
      paths.forEach((path, index) => {
        if (context.isPointInPath(path.path2D, mouseX, mouseY)) {

          this.drawHoveredArea(context, path.path2D);

          this.mapRef.nativeElement.style.cursor = 'pointer';
          console.log(index);
        } else {
          this.drawArea(context, path.path2D);
        }
      });
    });

    canvas.addEventListener('click', (e: MouseEvent) => {
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;
      paths.forEach((path, index) => {
        if (context.isPointInPath(path.path2D, mouseX, mouseY)) {
          this.router.navigate([ '/selection/' + path.area.key + '-' +  (path.area.name).toLowerCase() + '/products' ]);
        }
      });
    });
  }

  drawArea(context: CanvasRenderingContext2D, path2D: Path2D) {
    context.fillStyle = 'rgb(61, 106, 190)';
    context.strokeStyle = 'rgb(30, 53, 125)';
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 3;
    context.miterLimit = 10;
    context.fill(path2D);
    context.stroke(path2D);
  }

  drawHoveredArea(context: CanvasRenderingContext2D, path2D: Path2D) {
    context.fillStyle = '#f56b2a';
    context.strokeStyle = 'rgb(30, 53, 125)';
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 3;
    context.miterLimit = 10;
    context.fill(path2D);
    context.stroke(path2D);
    context.restore();
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
