import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { FirebaseAgendaComponent } from './agenda/firebase-agenda.component';

const routes: Routes = [
  {
    path: '',
    component: FirebaseAgendaComponent
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
export class FirebaseAgendaRoutingModule {
}
