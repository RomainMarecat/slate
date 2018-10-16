import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from '../../../popup/dialog/dialog.component';
import { MenuService } from '../../../menu/menu.service';
import { MatDialog } from '@angular/material';
import { Article } from '../../../article/shared/article';
import { ArticleService } from '../../../article/shared/article.service';
import { AlertService } from '../../../popup/alert.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-admin-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: TableColumn[];
  articles: Article[] = [];
  isLoading = false;
  selected: Article[] = [];
  @ViewChild('checkboxCell') checkboxCell: TemplateRef<any>;
  @ViewChild('actionsCell') actionsCell: TemplateRef<any>;
  @ViewChild('publicationCell') publicationCell: TemplateRef<any>;

  /**
   * @param dialog
   * @param router
   * @param table
   * @param menuService
   * @param articleService
   * @param alertService
   */
  constructor(public dialog: MatDialog,
              private router: Router,
              private table: ElementRef,
              private menuService: MenuService,
              private articleService: ArticleService,
              private alertService: AlertService,
              private localizeRouterService: LocalizeRouterService) {
  }

  /**
   * Delete a Article from list
   */
  deleteArticles() {
    this.selected.forEach((article: Article) => {
      this.articleService.deleteArticle(article);
    });
  }

  deleteArticle(article: Article) {
    this.articleService.deleteArticle(article);
  }

  confirmDelete(article: Article) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation de suppression de l\'article',
        content: 'Voulez-vous continuer de supprimer l\'article ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteArticle(article);
      }
    });
  }

  /**
   * Init list of Article
   */
  ngOnInit() {
    this.menuService.nextTitle('Articles');
    this.columns = [{
      width: 50,
      sortable: false,
      canAutoResize: false,
      draggable: false,
      resizeable: false,
      cellTemplate: this.checkboxCell,
    }, {
      prop: 'name',
      name: 'name',
      flexGrow: 1
    }, {
      prop: 'description',
      name: 'description',
      flexGrow: 1
    }, {
      prop: 'published_at',
      name: 'published_at',
      flexGrow: 1
    }, {
      prop: 'published',
      name: 'published',
      flexGrow: 1,
      cellTemplate: this.publicationCell
    }, {
      prop: 'key',
      name: 'Actions',
      flexGrow: 1,
      cellTemplate: this.actionsCell
    }, ];
    this.articleService.getArticles()
      .subscribe((articles: Article[]) => {
        this.articles = articles;
      });
  }

  /**
   * Update a publication
   * @param article
   */
  private updatePublication(article: Article) {
    if (article.published === true) {
      if (!article.published_at) {
        article.published_at = new Date();
      }
    } else {
      article.published_at = null;
    }

    this.articleService.updateArticle(article)
      .then(() => {
        this.alertService.show(article.name + ' mis à jour');
      });
  }

  /**
   * set published value
   * @param article
   * @param event
   */
  updateArticlePublication(article: Article, event: {source: any, value: boolean}) {
    article.published = event.value;
    this.updatePublication(article);
  }


  /**
   * On select add new list in selection array
   * @param {any} selected
   */
  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    if (event.type === 'dblclick') {
      this.router.navigate([this.localizeRouterService.translateRoute('/admin/article/edit'), event.row.key]);
    }
  }

  onScroll(event: any) {
  }

  onCheckboxChangeFn(event) {
  }
}
