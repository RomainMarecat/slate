import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { HomepageComponent } from './homepage.component';

const homeRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomepageComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        override: true,
        title: 'Choisissez et réservez votre professionnel du sport - rentand',
        description: 'rentand, le site qui vous permet de choisir et '
          + 'réserver votre moniteur de ski, coach sportif, professionnel du sport, tout simplement !'
      }
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes),
  ],
  exports: [RouterModule]
})
export class HomepageRoutingModule {
}
