import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AlertService } from '../../../popup/alert.service';
import { StringService } from '../../../util/string.service';
import { DocumentReference } from '@firebase/firestore-types';
import { Article } from '../../../article/shared/article';
import { ArticleService } from '../../../article/shared/article.service';
import { ArticleFormType } from '../../shared/article/form-article';

@Component({
  selector: 'app-admin-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: [ './article-edit.component.scss' ]
})
export class ArticleEditComponent implements OnInit {

  form: FormGroup;
  article: Article;
  editorConfig: any;

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any;
  selected: string[] = [];
  isLoading: boolean;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef<any>;

  /**
   *
   * @param activatedRoute
   * @param router
   * @param alertService
   * @param articleService
   */
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private articleService: ArticleService) {
  }

  ngOnInit() {
    this.createForm();
    this.getArticle();
    this.observeUpdate();
    this.editorConfig = {
      'editable': true,
      'spellcheck': false,
      'height': '5rem',
      'minHeight': '2rem',
      'placeholder': 'Enter text content',
      'translate': 'no',
      'toolbar': []
    };
  }

  createForm() {
    const formType = new ArticleFormType(this.article);
    this.form = formType.getForm();
  }

  getArticle() {
    this.activatedRoute.params.subscribe((value: { key: string }) => {
      if (value.key) {
        const key = value.key;
        this.articleService.getArticle(key)
          .subscribe((article: Article) => {
            this.article = article;
            this.createForm();
            setTimeout(() => {
              this.observeUpdate();
            }, 2000);
          });
      }
    });
  }

  observeUpdate() {
    this.form.valueChanges
      .debounceTime(800)
      .subscribe((value) => {
        if (value.name) {
          const slug = StringService.slugify(value.name);
          this.form.patchValue({name: value.name, slug: slug});
        }
      });
  }

  reset() {
    this.selected = [];
    this.form.reset({
      name: '',
      description: '',
      slug: '',
      translations: {
        fr: ''
      },
      images: [],
      category: null,
      published: true,
      published_at: null,
    });
  }

  saveArticle() {
    if (this.form.valid) {

      this.article = {...this.article, ...this.form.value};
      if (this.article.published === true) {
        this.article.published_at = new Date();
      }
      if (this.article.key) {
        this.articleService.updateArticle(this.article)
          .then((doc) => {
            this.alertService.show(`article updated ${this.article.name}`);
            this.reset();
            this.router.navigate([ '/admin/article' ]);
          }, (err) => {
            this.alertService.show(`article error ${err}`);
          });
      } else {
        this.articleService.createArticle(this.article)
          .then((doc: DocumentReference) => {
            this.alertService.show(`article added ${doc.id}`);
            this.reset();
            this.router.navigate([ '/admin/article' ]);
          }, (err) => {
            this.alertService.show(`article error ${err}`);
          });
      }
    }
  }

  get name() {
    return this.form.get('name');
  }

  set name(name) {
    this.form.patchValue({name: name});
  }

  get slug() {
    return this.form.get('slug');
  }

  set slug(slug) {
    this.form.patchValue({slug: slug});
  }

  get fr() {
    return this.form.get('translations').get('fr');
  }

  set fr(fr) {
    this.form.get('translations').patchValue({fr: fr});
  }
}
