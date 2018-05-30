import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgxEditorModule } from 'ngx-editor';
import { SharedModule } from '../../shared.module';
import { ArticleService } from '../../article/shared/article.service';
import { MatIconRegistry } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const TABLE_ARTICLE = new InjectionToken<string>('article');

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxDatatableModule,
    SharedModule,
    NgxEditorModule,
    ArticleRoutingModule
  ],
  declarations: [
    ArticleListComponent,
    ArticleEditComponent,
  ],
  providers: [
    MatIconRegistry,
    {provide: TABLE_ARTICLE, useValue: 'article'},
    {
      provide: ArticleService,
      useClass: ArticleService,
      deps: [ AngularFirestore, TABLE_ARTICLE ]
    },
  ]
})
export class ArticleModule {
}
