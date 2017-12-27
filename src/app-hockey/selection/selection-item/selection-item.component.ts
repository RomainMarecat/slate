import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Selection } from './../../../core/shared/selection/selection';
import { SelectionService } from './../../../core/shared/selection/selection.service';

@Component({
  selector: 'app-selection-item',
  templateUrl: './selection-item.component.html',
  styleUrls: ['./selection-item.component.scss']
})
export class SelectionItemComponent implements OnInit {
  @Input('selection') selection: Selection;
  @Output('selectedSelection') selectedSelection: EventEmitter < Selection > = new EventEmitter < Selection > ();
  constructor(private selectionService: SelectionService) {}

  ngOnInit() {}

  /*selectionChildren(selection: Selection) {
    console.log(selection);
    this.selectionService.parentFilters$.next(selection.key);
    this.selectionService.getSelections();
  }
*/
  onSelectedSelection(event: MouseEvent) {
    this.selectedSelection.emit(this.selection);
  }

}
