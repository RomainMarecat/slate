import { Component, Input, OnInit } from '@angular/core';
import { Area } from '../shared/area';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: [ './area-list.component.scss' ]
})
export class AreaListComponent implements OnInit {
  _areas: Area[];

  constructor() {
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
    return '/selection/' + area.key + '-' + (area.name).toLowerCase() + '/products';
  }
}
