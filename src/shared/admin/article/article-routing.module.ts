import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { AdminGuard } from '../../guard/admin.guard';

const routes: Routes = [ {
  path: '',
  redirectTo: 'list',
  canActivate: [ AdminGuard ],
  component: ArticleListComponent
},
  {
    path: 'list',
    canActivate: [ AdminGuard ],
    component: ArticleListComponent
  },
  {
    path: 'edit/:key',
    canActivate: [ AdminGuard ],
    component: ArticleEditComponent
  },
  {
    path: 'add',
    canActivate: [ AdminGuard ],
    component: ArticleEditComponent
  },

];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ArticleRoutingModule {
}
