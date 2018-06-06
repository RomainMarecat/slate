import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { DragulaModule } from 'ng2-dragula';
import { SharedModule } from '../../shared/shared.module';
import { CardComponent } from './card/card.component';
import { ColumnComponent } from './column/column.component';
import { BoardComponent } from './board/board.component';

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
    BoardComponent
  ]
})
export class BoardModule {
}
