import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { BoardListComponent } from './board-list/board-list.component';

const routes: Routes = [
  {
    path: 'board/:key',
    pathMatch: 'full',
    component: BoardComponent
  }, {
    path: 'boards',
    pathMatch: 'full',
    component: BoardListComponent
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class BoardRoutingModule {
}
