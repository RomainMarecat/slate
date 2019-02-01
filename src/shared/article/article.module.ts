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
import { MediaService } from '../media/media.service';
import { ArticleItemComponent } from './article-item/article-item.component';
import { ArticleComponent } from './article/article.component';

const TABLE_ARTICLE = new InjectionToken<string>('article');
const TABLE_MEDIA = new InjectionToken<string>('media');

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
    ArticleDetailComponent,
    ArticleItemComponent,
    ArticleComponent,
  ],
  exports: [
    ArticleListComponent,
    ArticleDetailComponent,
    ArticleItemComponent,
    ArticleComponent
  ],
  providers: [
    {provide: TABLE_MEDIA, useValue: 'media'},
    {provide: MediaService, useClass: MediaService, deps: [AngularFirestore, TABLE_MEDIA]},
    {provide: TABLE_ARTICLE, useValue: 'article'},
    {provide: ArticleService, useClass: ArticleService, deps: [AngularFirestore, TABLE_ARTICLE]},
  ]
})
export class ArticleModule {
}
