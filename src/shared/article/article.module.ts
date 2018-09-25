import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleService } from './shared/article.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material';
import { PipeModule } from '../pipe/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgArrayPipesModule } from 'ngx-pipes';
import { MediaModule } from '../media/media.module';

export const TABLE_ARTICLE = new InjectionToken<string>('article');

@NgModule({
  imports: [
    ArticleRoutingModule,
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MediaModule,
    NgArrayPipesModule,
    PipeModule,
    TranslateModule.forChild()
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
    {provide: TABLE_ARTICLE, useValue: 'article'},
    {provide: ArticleService, useClass: ArticleService, deps: [AngularFirestore, TABLE_ARTICLE]},
  ]
})
export class ArticleModule {
}
