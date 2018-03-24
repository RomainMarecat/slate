import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Area } from '../shared/area';
import { Path2DConstructor } from '../shared/path2d';
import { Router } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import 'rxjs/add/operator/take';

declare var Path2D: Path2DConstructor;

@Component({
  selector: 'app-area-draw',
  templateUrl: './area-draw.component.html',
  styleUrls: [ './area-draw.component.scss' ]
})
export class AreaDrawComponent implements OnInit {
  @ViewChild('map') mapRef: ElementRef;

  _areas: Area[];
  width = 600;
  height = 550;
  containerHeight = 550;

  constructor(private router: Router, private media: ObservableMedia) {
  }

  getContainerHeight(): string {
    return this.containerHeight.toString() + 'px';
  }

  ngOnInit() {
    this.media.asObservable()
      .take(1)
      .subscribe((change: MediaChange) => {
        if (change.mqAlias === 'xs') {
          this.containerHeight = window.innerHeight * 0.5;
        }
      });
  }

  @Input() set areas(areas) {
    this._areas = areas;
    this.paintAreas();
  }

  get areas() {
    return this._areas;
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
      paths.forEach((path) => {
        if (context.isPointInPath(path.path2D, mouseX, mouseY)) {
          this.drawHoveredArea(context, path.path2D);
          this.mapRef.nativeElement.style.cursor = 'pointer';
        } else {
          this.drawArea(context, path.path2D);
        }
      });
    });

    canvas.addEventListener('click', (e: MouseEvent) => {
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;
      paths.forEach((path) => {
        if (context.isPointInPath(path.path2D, mouseX, mouseY)) {
          this.router.navigate([ '/selection/' + path.area.key + '-' + (path.area.name).toLowerCase() + '/products' ]);
        }
      });
    });
  }

  drawArea(context: CanvasRenderingContext2D, path2D: Path2D) {
    context.fillStyle = '#3d6abe';
    context.strokeStyle = '#1e357d';
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 3;
    context.miterLimit = 10;
    context.fill(path2D);
    context.stroke(path2D);
  }

  drawHoveredArea(context: CanvasRenderingContext2D, path2D: Path2D) {
    context.fillStyle = '#f56b2a';
    context.strokeStyle = '#1e357d';
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 3;
    context.miterLimit = 10;
    context.fill(path2D);
    context.stroke(path2D);
    context.restore();
  }

}
