import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Area } from '../shared/area';
import { Path2DConstructor } from '../shared/path2d';
import { Router } from '@angular/router';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

declare var Path2D: Path2DConstructor;

@Component({
  selector: 'app-area-draw',
  templateUrl: './area-draw.component.html',
  styleUrls: ['./area-draw.component.scss']
})
export class AreaDrawComponent implements OnInit {
  @ViewChild('map') mapRef: ElementRef;
  @Input() mapConfig: any;

  _areas: Area[];
  width = 600;
  height = 550;
  containerHeight = 550;
  paths: any[] = [];

  constructor(private router: Router,
              private media: ObservableMedia,
              private localizeRouterService: LocalizeRouterService) {
  }

  getContainerHeight(): string {
    return this.containerHeight.toString() + 'px';
  }

  ngOnInit() {
    this.media.asObservable()
      .subscribe((change: MediaChange) => {
        if (change.mqAlias === 'xs') {
          this.containerHeight = window.innerWidth * 0.91;
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
    const context: CanvasRenderingContext2D = this.mapRef.nativeElement.getContext('2d');
    this.areas.forEach((area: Area, index: number) => {
      const path2D = new Path2D(area.path);
      this.drawPath(context, path2D);

      this.paths.push({area: area, path2D: path2D});
    });

    /**
     * The mousemove eventlooks after changing the pointer to the
     * hand and back.
     */
    this.mapRef.nativeElement.addEventListener('mousemove', (e: MouseEvent) => {
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;

      this.mapRef.nativeElement.style.cursor = 'default';
      this.paths.forEach((path) => {
        if (context.isPointInPath(path.path2D, mouseX, mouseY)) {
          this.drawHoveredPath(context, path.path2D);
          this.mapRef.nativeElement.style.cursor = 'pointer';
        } else {
          this.drawPath(context, path.path2D);
        }
      });
    });

    this.mapRef.nativeElement.addEventListener('click', (e: MouseEvent) => {
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;
      this.paths.forEach((path) => {
        if (context.isPointInPath(path.path2D, mouseX, mouseY)) {
          // console.log('click', mouseX, mouseY, path.area);
          this.router.navigate([
            this.localizeRouterService.translateRoute('/products'),
            'map',
            'area',
            path.area.key + '-' + (path.area.name).toLowerCase(),
            'products'
          ]);
        }
      });
    });

    // this.mapRef.nativeElement.addEventListener('touchend', (e: TouchEvent) => {
    //   const touches = e.changedTouches;
    //   this.paths.forEach((path) => {
    //     for (let i = 0; i < touches.length; i++) {
    //       // console.log('touchend', touches[ i ].clientX, touches[ i ].clientY, path.area.name);
    //
    //       if (context.isPointInPath(path.path2D, touches[ i ].clientX, touches[ i ].clientY)) {
    //         console.log('selected touchend', touches[ i ].clientX, touches[ i ].clientY, path.area.name);
    //
    //         this.drawHoveredPath(context, path.path2D);
    //         this.router.navigate([ '/area/' + path.area.key + '-' + (path.area.name).toLowerCase() + '/products' ]);
    //       }
    //     }
    //   });
    // });
  }

  isVisibleOnMobile() {
    return true;
  }

  drawHoveredArea(area: Area) {
    const context: CanvasRenderingContext2D = this.mapRef.nativeElement.getContext('2d');
    this.paths.forEach((path) => {
      if (path.area.key === area.key) {
        this.drawHoveredPath(context, path.path2D);
      } else {
        this.drawPath(context, path.path2D);
      }
    });
  }

  drawPath(context: CanvasRenderingContext2D, path2D: Path2D) {
    if (this.mapConfig &&
      this.mapConfig.context &&
      this.mapConfig.context.path &&
      this.mapConfig.context.path.strokeStyle &&
      this.mapConfig.context.path.fillStyle) {
      context.fillStyle = this.mapConfig.context.path.fillStyle;
      context.strokeStyle = this.mapConfig.context.path.strokeStyle;
    }
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 3;
    context.miterLimit = 10;
    context.fill(path2D);
    context.stroke(path2D);
  }

  drawHoveredPath(context: CanvasRenderingContext2D, path2D: Path2D) {
    if (this.mapConfig &&
      this.mapConfig.context &&
      this.mapConfig.context.hovered &&
      this.mapConfig.context.hovered.strokeStyle &&
      this.mapConfig.context.hovered.fillStyle) {
      context.fillStyle = this.mapConfig.context.hovered.fillStyle;
      context.strokeStyle = this.mapConfig.context.hovered.strokeStyle;
    }
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 3;
    context.miterLimit = 10;
    context.fill(path2D);
    context.stroke(path2D);
    context.restore();
  }

}
