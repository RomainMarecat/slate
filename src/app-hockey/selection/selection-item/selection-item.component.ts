import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Selection } from '../../../shared/selection/selection';
import { SelectionService } from '../../../shared/selection/selection.service';

@Component({
  selector: 'app-selection-item',
  templateUrl: './selection-item.component.html',
  styleUrls: ['./selection-item.component.scss']
})
export class SelectionItemComponent implements OnInit {
  @Input() selection: Selection;
  @Output() selected: EventEmitter<Selection> = new EventEmitter<Selection>();

  constructor(private selectionService: SelectionService) {
  }

  ngOnInit() {
  }

  onSelected(event: MouseEvent) {
    this.selected.emit(this.selection);
  }
}
