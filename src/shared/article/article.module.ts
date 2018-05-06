import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleService } from './shared/article.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ArticleRoutingModule
  ],
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent
  ],
  exports: [
    ArticleListComponent,
    ArticleDetailComponent
  ],
  providers: [
    ArticleService
  ]
})
export class ArticleModule {
}
