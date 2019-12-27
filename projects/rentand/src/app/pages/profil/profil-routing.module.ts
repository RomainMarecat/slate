import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { ProfilComponent } from './profil.component';

const routes: Routes = [
  {
    path: ':slug',
    component: ProfilComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        override: true,
        title: 'Découvrez votre moniteur de ski sur rentand !',
        description: 'Découvrez votre moniteur de ski sur rentand !'
      }
    },
  },
  {
    path: '',
    component: ProfilComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        override: true,
        title: 'Voir plus de profils - rentand',
        description: 'Voir plus de profils'
      }
    },
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ProfilRoutingModule {
}
