import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AlertService } from '../../../popup/alert.service';
import { StringService } from '../../../util/string.service';
import { DocumentReference } from '@firebase/firestore-types';
import { Article } from '../../../article/shared/article';
import { ArticleService } from '../../../article/shared/article.service';
import { ArticleFormType } from '../../shared/article/form-article';
import { MatIconRegistry } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Media } from '../../../media/media';
import { TableColumn } from '@swimlane/ngx-datatable';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-admin-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {

  form: FormGroup;
  article: Article;
  editorConfig: any;

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: TableColumn[];
  selected: string[] = [];
  isLoading: boolean;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef<any>;
  _facebook: string;
  imageStorageConfig: any;
  downloadURL: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private articleService: ArticleService,
              public matIconRegistry: MatIconRegistry,
              private localizeRouterService: LocalizeRouterService) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  ngOnInit() {
    this.createForm();
    this.getArticle();
    this.observeUpdate();
    this.editorConfig = {
      'editable': true,
      'spellcheck': false,
      'height': '10rem',
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
    this.activatedRoute.params.subscribe((value: {key: string}) => {
      if (value.key) {
        const key = value.key;
        this.articleService.getArticle(key)
          .subscribe((article: Article) => {
            this.article = article;
            this.createImageStorageConfig();
            this.createForm();
            setTimeout(() => {
              this.observeUpdate();
            }, 2000);
          });
      }
    });
  }

  createImageStorageConfig() {
    this.imageStorageConfig = {
      model: this.article.key,
      alt: this.article.name,
    };
  }

  /**
   * image change function of emitter
   */
  onImageChange(media: Media) {
    this.form.patchValue({
      images: [...this.form.get('images').value, ...[media.key]]
    });
    this.form.get('images').markAsTouched();
    this.form.markAsTouched();
    this.alertService.toast('media saved');
  }

  onImageRefChanged(task: UploadTaskSnapshot) {
    task.ref.getDownloadURL().then((downloadURL => {
        this.downloadURL = downloadURL;
      }),
      (err) => {
        this.alertService.show(err);
      });
  }

  observeUpdate() {
    this.form.valueChanges
      .pipe(
        debounceTime(800)
      )
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
        this.article.published_at = Timestamp.now();
      }
      if (this.article.key) {
        this.articleService.updateArticle(this.article)
          .then((doc) => {
            this.alertService.show(`article updated ${this.article.name}`);
            this.reset();
            this.router.navigate([this.localizeRouterService.translateRoute('/admin/article')]);
          }, (err) => {
            this.alertService.show(`article error ${err}`);
          });
      } else {
        this.articleService.createArticle(this.article)
          .then((doc: DocumentReference) => {
            this.alertService.show(`article added ${doc.id}`);
            this.reset();
            this.router.navigate([this.localizeRouterService.translateRoute('/admin/article')]);
          }, (err) => {
            this.alertService.show(`article error ${err}`);
          });
      }
    }
  }

  get facebook() {
    return this._facebook;
  }

  set facebook(facebook: string) {
    this.form.patchValue({description: facebook});
    this._facebook = facebook;
  }
}
