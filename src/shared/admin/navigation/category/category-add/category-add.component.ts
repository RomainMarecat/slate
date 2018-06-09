import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CategoryService } from '../../../../category/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../../popup/alert.service';
import { StringService } from '../../../../util/string.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Category } from '../../../../category/category';
import { DocumentReference } from '@firebase/firestore-types';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  form: FormGroup;
  category: Category;

  // Datatable parent categories
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any;
  categories$: Observable<Category[]> = of([]);
  selected: Category[] = [];
  isLoading: boolean;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef<any>;

  // ngModel attributes
  _publication: boolean;
  _rootModel: string;

  constructor(private categoryService: CategoryService, private alertService: AlertService) {
    this._publication = true;
    this._rootModel = '';
  }

  ngOnInit() {
    this.columns = [{
      width: 50,
      sortable: false,
      canAutoResize: false,
      draggable: false,
      resizeable: false,
      cellTemplate: this.checkboxCell,
      headerTemplate: this.checkboxHeader,
    },
      {
        prop: 'name',
        name: 'name',
        flexGrow: 1
      }, {
        prop: 'published',
        name: 'published',
        flexGrow: 1
      }, {
        prop: 'level',
        name: 'level',
        flexGrow: 1
      }
    ];
    this.categoryService.orderBy$.next({column: 'name', direction: 'asc'});
    this.categories$ = this.categoryService.getCategories();
    this.createForm();

    this.form.valueChanges
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe((value) => {
        if (value.name) {
          const slug = StringService.slugify(value.name);
          this.form.patchValue({
            name: value.name.trim(),
            slug: slug,
            translations: {
              fr: value.translations.fr ? value.translations.fr : value.name.trim()
            },
            alias: value.name.trim().toLowerCase(),
            keywords: value.name.trim().toLowerCase(),
            description: value.description && value.name !== value.description ? value.description : value.name
          });
        }
      });
  }

  createForm() {
    this.form = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
      ]),
      'translations': new FormGroup({
        'fr': new FormControl('', [
          Validators.required,
        ])
      }),
      'description': new FormControl('', [
        Validators.required,
      ]),
      'slug': new FormControl('', [
        Validators.required,
      ]),
      'alias': new FormControl('', [
        Validators.required,
      ]),
      'keywords': new FormControl(''),
      'level': new FormControl(1, [
        Validators.required,
      ]),
      'lft': new FormControl('', []),
      'rgt': new FormControl('', []),
      'root': new FormControl(false, []),
      'parent': new FormControl(null, []),
      'published': new FormControl(true, []),
    });
  }

  saveCategory() {
    this.isLoading = true;
    this.form.patchValue({published: this._publication, root: this._rootModel});
    if (this.form.valid === true) {
      this.category = this.form.value;
      if (this.category.published === true) {
        this.category.published_at = new Date();
      }

      this.categoryService.createCategory(this.category)
        .then((doc: DocumentReference) => {
          this.category.key = doc.id;
          this.categoryService.updateCategory(this.category)
            .then(() => {
              this.alertService.toast(`La catégorie est ajoutée ${this.category.name}`, 'info');
              this.reset();
              this.isLoading = false;
            }, (err) => {
              this.alertService.toast(err);
              this.isLoading = false;
            });
        }, (err) => {
          this.alertService.toast(err);
          this.isLoading = false;
        });
    } else {
      this.isLoading = false;
    }
  }

  reset() {
    this.form.reset({
      name: '',
      description: '',
      translations: {
        fr: '',
      },
      slug: '',
      alias: '',
      keywords: '',
      level: 1,
      lft: '',
      rgt: '',
      root: true,
      parent: null,
      published: true,
    });
    this.category = null;
    this.selected = [];
  }

  /**
   * On select add reinit and add category in selection array
   * @param any selected
   */
  onSelect({selected}) {
    this.selected = [];
    this.selected.push(...selected);
    this.addParent();
  }

  onActivate(event) {
  }

  /**
   * set at published at now et activate published to true
   */
  addParent() {
    this.selected.forEach((category: Category) => {
      this.form.patchValue({
        parent: category.key,
        level: category.level + 1,
        root: false
      });
      this.alertService.toast(`parent selected ${category.name}`);
    });

  }

  get name() {
    return this.form.get('name');
  }

  set name(name) {
    this.form.patchValue({name: name});
  }

  get description() {
    return this.form.get('description');
  }

  set description(description) {
    this.form.patchValue({description: description});
  }

  get fr() {
    return this.form.get('translations').get('fr');
  }

  set fr(fr) {
    this.form.get('translations').patchValue({fr: fr});
  }

  get slug() {
    return this.form.get('slug');
  }

  set slug(slug) {
    this.form.patchValue({slug: slug});
  }

  get alias() {
    return this.form.get('alias');
  }

  set alias(alias) {
    this.form.patchValue({alias: alias});
  }

  get keywords() {
    return this.form.get('keywords');
  }

  set keywords(keywords) {
    this.form.patchValue({keywords: keywords});
  }

  get level() {
    return this.form.get('level');
  }

  set level(level) {
    this.form.patchValue({level: level});
  }

  get lft() {
    return this.form.get('lft');
  }

  set lft(lft) {
    this.form.patchValue({lft: lft});
  }

  get rgt() {
    return this.form.get('rgt');
  }

  set rgt(rgt) {
    this.form.patchValue({rgt: rgt});
  }

  get root() {
    return this.form.get('root');
  }

  set root(root) {
    this.form.patchValue({root: root});
  }

  get rootModel() {
    return this._rootModel;
  }

  set rootModel(rootModel) {
    this._rootModel = rootModel;
  }

  get parent() {
    return this.form.get('parent');
  }

  set parent(parent) {
    this.form.patchValue({parent: parent});
  }

  get publication() {
    return this._publication;
  }

  set publication(publication) {
    this._publication = publication;
  }

  get published() {
    return this.form.get('published');
  }

  set published(published) {
    this.form.patchValue({published: published});
  }
}
