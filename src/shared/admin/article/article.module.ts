import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularFirestore } from '@angular/fire/firestore';

import { SharedModule } from '../../shared.module';
import { ArticleService } from '../../article/shared/article.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StringService } from '../../util/string.service';
import { AlertService } from '../../popup/alert.service';
import { TranslateModule } from '@ngx-translate/core';
import { MediaService } from '../../media/media.service';
import { ArticleComponent } from './article/article.component';
import { MatIconRegistry } from '@angular/material/icon';

export const TABLE_ARTICLE = new InjectionToken<string>('article');
export const TABLE_MEDIA = new InjectionToken<string>('media');

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxDatatableModule,
    SharedModule,

    ArticleRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [
    ArticleListComponent,
    ArticleEditComponent,
    ArticleComponent,
  ],
  entryComponents: [
    ArticleListComponent
  ],
  providers: [
    MatIconRegistry,
    StringService,
    AlertService,
    {provide: TABLE_ARTICLE, useValue: 'article'},
    {provide: TABLE_MEDIA, useValue: 'media'},
    {provide: MediaService, useClass: MediaService, deps: [AngularFirestore, TABLE_MEDIA]},
    {provide: ArticleService, useClass: ArticleService, deps: [AngularFirestore, TABLE_ARTICLE]},
  ]
})
export class ArticleModule {
}
