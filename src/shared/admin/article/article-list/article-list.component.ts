import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableColumn } from '@swimlane/ngx-datatable';
import { LocalizeRouterService } from 'localize-router';
import { Article } from '../../../article/shared/article';
import { ArticleService } from '../../../article/shared/article.service';
import { MenuService } from '../../../menu/menu.service';
import { AlertService } from '../../../popup/alert.service';
import { DialogComponent } from '../../../popup/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  columns: TableColumn[];
  articles: Article[] = [];
  isLoading = false;
  selected: Article[] = [];
  @ViewChild('checkboxCell', {static: false}) checkboxCell: TemplateRef<any>;
  @ViewChild('actionsCell', {static: false}) actionsCell: TemplateRef<any>;
  @ViewChild('publicationCell', {static: false}) publicationCell: TemplateRef<any>;
  @ViewChild('headerTemplate', {static: false}) headerTemplate: TemplateRef<any>;

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
    this.setColumns();
    this.getArticles();
  }

  setColumns() {
    this.columns = [{
      width: 50,
      sortable: false,
      canAutoResize: false,
      draggable: false,
      resizeable: false,
      cellTemplate: this.checkboxCell,
    }, {
      prop: 'name',
      name: 'datatable.column.name',
      headerTemplate: this.headerTemplate,
      flexGrow: 1
    }, {
      prop: 'description',
      name: 'datatable.column.description',
      headerTemplate: this.headerTemplate,
      flexGrow: 1
    }, {
      prop: 'published_at',
      name: 'datatable.column.published_at',
      headerTemplate: this.headerTemplate,
      flexGrow: 1
    }, {
      prop: 'published',
      name: 'datatable.column.published',
      headerTemplate: this.headerTemplate,
      flexGrow: 1,
      cellTemplate: this.publicationCell
    }, {
      prop: 'key',
      name: 'datatable.column.actions',
      headerTemplate: this.headerTemplate,
      flexGrow: 1,
      cellTemplate: this.actionsCell
    }];
  }

  getArticles() {
    this.articleService.getArticles()
      .subscribe((articles: Article[]) => {
        this.articles = articles;
      }, (err) => {
        this.alertService.show(err);
        this.articles = [];
      });
  }

  /**
   * Update a publication
   */
  private updatePublication(article: Article) {
    if (article.published === true) {
      if (!article.published_at) {
        article.published_at = Math.floor(Date.now() / 1000) as unknown as any;
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
   */
  updateArticlePublication(article: Article, event: {source: any, value: boolean}) {
    article.published = event.value;
    this.updatePublication(article);
  }


  /**
   * On select add new list in selection array
   */
  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    if (event.type === 'dblclick') {
      this.router.navigate([
        this.localizeRouterService.translateRoute('/admin/article/edit'),
        event.row.key
      ]);
    }
  }

  onScroll(event: any) {
  }

  onCheckboxChangeFn(event) {
  }
}
