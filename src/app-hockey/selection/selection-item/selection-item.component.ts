import { Component, Input, OnInit } from '@angular/core';
import { Selection } from './../../../core/shared/selection/selection';

@Component({
  selector: 'app-selection-item',
  templateUrl: './selection-item.component.html',
  styleUrls: ['./selection-item.component.scss']
})
export class SelectionItemComponent implements OnInit {
  @Input('selection') selection: Selection;

  constructor() {}

  ngOnInit() {}

}
