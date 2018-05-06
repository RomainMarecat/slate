import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from '../../../popup/dialog/dialog.component';
import { MenuService } from '../../../menu/menu.service';
import { MatDialog } from '@angular/material';
import { Article } from '../../../article/shared/article';
import { ArticleService } from '../../../article/shared/article.service';

@Component({
  selector: 'app-admin-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: [ './article-list.component.scss' ]
})
export class ArticleListComponent implements OnInit {

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any;
  articles: Article[];
  isLoading = false;
  selected: Article[] = [];
  @ViewChild('checkboxCell') checkboxCell: TemplateRef<any>;
  @ViewChild('actionsCell') actionsCell: TemplateRef<any>;

  /**
   * @param dialog
   * @param router
   * @param table
   * @param menuService
   * @param articleService
   */
  constructor(public dialog: MatDialog,
              private router: Router,
              private table: ElementRef,
              private menuService: MenuService,
              private articleService: ArticleService) {
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
    this.columns = [ {
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
      flexGrow: 1
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
   * On select add new list in selection array
   * @param {any} selected
   */
  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    if (event.type === 'dblclick') {
      this.router.navigate([ '/admin/article/edit/', event.row.key ]);
    }
  }

  onScroll(event: any) {
  }

  onCheckboxChangeFn(event) {
  }
}
