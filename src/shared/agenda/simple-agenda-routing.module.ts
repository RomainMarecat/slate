import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { SimpleAgendaComponent } from './simple-agenda/simple-agenda.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleAgendaComponent
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
export class SimpleAgendaRoutingModule {
}
