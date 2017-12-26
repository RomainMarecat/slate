import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectionService } from '../../../shared/navigation/selection/selection.service';
import { Selection } from '../../../../../shared/selection/selection';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../../alert/alert.service';
import { Observable } from 'rxjs/Observable';
import { HockeyProduct } from '../../../../product/hockey-product';
import { Media } from '../../../../media/media';

@Component({
  selector: 'app-selection-edit',
  templateUrl: './selection-edit.component.html',
  styleUrls: ['./selection-edit.component.scss']
})
export class SelectionEditComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any;
  products$: Observable < HockeyProduct[] > ;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef < any > ;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef < any > ;

  selected: HockeyProduct[] = [];
  isLoading: boolean;
  form: FormGroup;
  selection: Selection;
  medias: Media[] = [];
  _publication = true;

  constructor(private activatedRoute: ActivatedRoute,
    private selectionService: SelectionService,
    private alertService: AlertService) {}

  ngOnInit() {
    this.columns = [{
      width: 50,
      sortable: false,
      canAutoResize: false,
      draggable: false,
      resizeable: false,
      cellTemplate: this.checkboxCell,
      headerTemplate: this.checkboxHeader,
    }, {
      prop: 'name',
      name: 'name',
      flexGrow: 1
    }, {
      prop: 'published',
      name: 'published',
      flexGrow: 1
    }, {
      prop: 'category',
      name: 'category',
      flexGrow: 1
    }];
    this.getSelection();
  }

  getSelection() {
    this.activatedRoute.params.subscribe((value: { key: string }) => {
      console.log(value);
      if (value.key) {
        const key = value.key;
        this.selectionService.getSelection(key)
          .subscribe((selection: Selection[]) => {
            selection.forEach((item: Selection) => {
              this.selection = item;
              this.createForm();
            });
          });
      }
    });
  }

  createForm() {
    this.form = new FormGroup({
      'name': new FormControl(this.selection.name, [
        Validators.required,
      ]),
      'slug': new FormControl(this.selection.slug, []),
      'alias': new FormControl(this.selection.alias, []),
      'description': new FormControl(
        this.selection.description ? this.selection.description : '', []
      ),
      'keywords': new FormControl(
        this.selection.keywords ? this.selection.keywords : '', []
      ),
      'level': new FormControl(
        this.selection.level ? this.selection.level : 1, []),
      'products': new FormControl(
        this.selection.products ? this.selection.products : [], []
      ),
      'images': new FormControl(
        this.selection.images ? this.selection.images : [], []
      ),
      'root': new FormControl(this.selection.root, []),
      'published': new FormControl(this.selection.published, []),
      'published_at': new FormControl(this.selection.published_at, [])
    });
  }

  saveSelection() {
    console.log(this.form);
    this.form.patchValue({ published: this._publication });
    if (this.form.valid === true) {
      this.selection = this.form.value;
      if (this.selection.published === true) {
        this.selection.published_at = new Date();
      }
      this.selectionService.updateSelection(this.selection);
      this.alertService.toast(`La selection ${this.selection.name} est mise à jour`, 'info');
      this.reset();
    }
  }

  reset() {
    this.form.reset({
      name: '',
      products: [],
      published: true,
      images: []
    });
    this.selection = null;
  }

  onImageChange(media: Media) {
    console.log('image changed');
    this.medias.push(media);
    this.form.patchValue({ images: this.medias.map((image: Media) => image.key) });
  }

  get name() {
    return this.form.get('name');
  }

  set name(name) {
    this.form.patchValue({ name: name });
  }

  get description() {
    return this.form.get('description');
  }

  set description(description) {
    this.form.patchValue({ description: description });
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

  get published_at() {
    return this.form.get('published_at');
  }

  set published_at(published_at) {
    this.form.patchValue({ published_at: published_at });
  }

  get root() {
    return this.form.get('root');
  }

  set root(root) {
    this.form.patchValue({ root: root });
  }

  get products() {
    return this.form.get('products');
  }

  set products(products) {
    this.form.patchValue({ products: products });
  }

  get images() {
    return this.form.get('images');
  }

  set images(images) {
    this.form.patchValue({ images: images });
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

  /**
   * On select add new list in selection array
   * @param {any} selected
   */
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  /**
   * set at published at now et activate published to true
   */
  addProducts() {
    this.selected.forEach((product: HockeyProduct) => {
      if (product.published === true) {
        this.form.patchValue({ products: this.form.get('products').value.push(product.key) });
      }
    });
  }
}
