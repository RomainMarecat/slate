import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardListComponent } from './board-list/board-list.component';
import { LocalizeRouterModule } from 'localize-router';
import { BoardComponent } from './board/board.component';
import { BoardDetailComponent } from './board-detail/board-detail.component';

const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
    data: {
      breadcrumb: 'breadcrumb.board.title'
    },
    children: [
      {
        path: '',
        component: BoardListComponent,
        data: {
          breadcrumb: 'breadcrumb.board.list'
        },
      },
      {
        path: ':key',
        component: BoardDetailComponent,
        data: {
          breadcrumb: 'breadcrumb.board.detail'
        },
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    LocalizeRouterModule
  ]
})
export class BoardRoutingModule {
}
