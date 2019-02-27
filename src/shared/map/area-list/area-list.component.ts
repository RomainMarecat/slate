import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Area } from '../shared/area';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent implements OnInit {
  _areas: Area[];
  @Output() areaHovered: EventEmitter<Area> = new EventEmitter<Area>();

  constructor(private localizeRouterService: LocalizeRouterService) {
  }

  ngOnInit() {
  }

  @Input() set areas(areas) {
    this._areas = areas;
  }

  get areas() {
    return this._areas;
  }

  getLink(area: Area) {
    return [
      this.localizeRouterService.translateRoute('/products'),
      'map',
      'area',
      area.key + '-' + (area.name).toLowerCase(),
      'products'
    ];
  }

  onHoverArea(area: Area) {
    this.areaHovered.emit(area);
  }
}
