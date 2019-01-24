import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleComponent,
    children: [
      {
        path: '',
        component: ArticleListComponent,
        data: {
          breadcrumb: 'breadcrumb.article.list'
        }
      },
      {
        path: ':key/detail',
        component: ArticleDetailComponent,
        data: {
          breadcrumb: 'breadcrumb.article.detail'
        }
      },
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
