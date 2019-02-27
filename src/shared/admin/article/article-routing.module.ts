import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { AdminGuard } from '../../guard/admin.guard';
import { LocalizeRouterModule } from 'localize-router';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: ArticleComponent,
    data: {
      breadcrumb: 'breadcrumb.article.title'
    },
    children: [
      {
        path: '',
        canActivate: [AdminGuard],
        component: ArticleListComponent,
        data: {
          breadcrumb: 'breadcrumb.article.list'
        }
      },
      {
        path: 'edit/:key',
        canActivate: [AdminGuard],
        component: ArticleEditComponent,
        data: {
          breadcrumb: 'breadcrumb.article.edit'
        }
      },
      {
        path: 'add',
        canActivate: [AdminGuard],
        component: ArticleEditComponent,
        data: {
          breadcrumb: 'breadcrumb.article.add'
        }
      }
    ]
  }
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
export class ArticleRoutingModule {
}
