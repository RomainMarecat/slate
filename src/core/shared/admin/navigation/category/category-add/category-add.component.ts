import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CategoryService } from '../../../shared/navigation/category/category.service';
import { Category } from '../../../shared/navigation/category/category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../../alert/alert.service';
import { StringService } from '../../../../util/string.service';
import { Observable } from 'rxjs/Observable';

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
  categories$: Observable < Category[] > = Observable.of([]);
  selected: Category[];
  isLoading: boolean;
  _publication: boolean;
  _rootModel: string;

  constructor(private categoryService: CategoryService, private alertService: AlertService) {
    this._publication = true;
    this._rootModel = '';
  }

  ngOnInit() {
    this.columns = [{
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
    }];
    this.categories$ = this.categoryService.getCategories();
    this.createForm();
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
      'keywords': new FormControl('', [
        Validators.required,
      ]),
      'level': new FormControl('', [
        Validators.required,
      ]),
      'lft': new FormControl('', []),
      'rgt': new FormControl('', []),
      'root': new FormControl(false, []),
      'parent': new FormControl('', []),
      'published': new FormControl(true, []),
    });
  }

  saveCategory() {
    console.log(this.form);

    if (this.form.valid === true) {
      this.form.patchValue({ published: this._publication, root: this._rootModel });
      this.category = this.form.value;
      this.categoryService.createCategory(this.category);
      this.alertService.toast(`La catégorie est ajoutée ${this.category.name}`, 'info');
      this.reset();
    }
  }

  reset() {
    this.form.reset({
      name: '',
      description: ''
    });
    this.category = null;
  }

  /**
   * On select add reinit and add category in selection array
   * @param any selected
   */
  onSelect({ selected }) {
    this.selected = [];
    this.selected.push(...selected);
  }

  /**
   * set at published at now et activate published to true
   */
  addParent() {
    this.selected.forEach((category: Category) => {
      this.form.patchValue({ parent: category.key });
    });
  }

  get name() {
    return this.form.get('name');
  }

  set name(name) {
    const slug = StringService.slugify(name);
    this.form.patchValue({ name: name, slug: slug });
  }

  get description() {
    return this.form.get('description');
  }

  set description(description) {
    this.form.patchValue({ description: description });
  }

  get fr() {
    return this.form.get('translations').get('fr');
  }

  set fr(fr) {
    this.form.get('translations').patchValue({ fr: fr });
  }

  get slug() {
    return this.form.get('slug');
  }

  set slug(slug) {
    this.form.patchValue({ slug: slug });
  }

  get alias() {
    return this.form.get('alias');
  }

  set alias(alias) {
    this.form.patchValue({ alias: alias });
  }

  get keywords() {
    return this.form.get('keywords');
  }

  set keywords(keywords) {
    this.form.patchValue({ keywords: keywords });
  }

  get level() {
    return this.form.get('level');
  }

  set level(level) {
    this.form.patchValue({ level: level });
  }

  get lft() {
    return this.form.get('lft');
  }

  set lft(lft) {
    this.form.patchValue({ lft: lft });
  }

  get rgt() {
    return this.form.get('rgt');
  }

  set rgt(rgt) {
    this.form.patchValue({ rgt: rgt });
  }

  get root() {
    return this.form.get('root');
  }

  set root(root) {
    this.form.patchValue({ root: root });
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
    this.form.patchValue({ parent: parent });
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
    this.form.patchValue({ published: published });
  }
}