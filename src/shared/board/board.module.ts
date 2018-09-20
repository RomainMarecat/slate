import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { DragulaModule } from 'ng2-dragula';
import { CardComponent } from './card/card.component';
import { ColumnComponent } from './column/column.component';
import { BoardComponent } from './board/board.component';
import { BoardListComponent } from './board-list/board-list.component';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DragulaModule,
    SharedModule,
    BoardRoutingModule
  ],
  declarations: [
    CardComponent,
    ColumnComponent,
    BoardComponent,
    BoardListComponent
  ]
})
export class BoardModule {
}
