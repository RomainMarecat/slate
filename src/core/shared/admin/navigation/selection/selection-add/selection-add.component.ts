import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SelectionService } from '../../../shared/navigation/selection/selection.service';
import { Selection } from '../../../shared/navigation/selection/selection';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../../alert/alert.service';
import { Observable } from 'rxjs/Observable';
import { HockeyProduct } from '../../../../product/hockey-product';
import { Media } from '../../../../media/media';

@Component({
  selector: 'app-selection-add',
  templateUrl: './selection-add.component.html',
  styleUrls: ['./selection-add.component.scss']
})
export class SelectionAddComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any;
  products$: Observable < HockeyProduct[] > ;


  selected: HockeyProduct[];
  isLoading: boolean;
  form: FormGroup;
  selection: Selection;
  medias: Media[];
  _publication = true;

  constructor(private selectionService: SelectionService,
    private alertService: AlertService) {
    this.medias = [];
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
      prop: 'category',
      name: 'category',
      flexGrow: 1
    }];
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
      ]),
      'products': new FormControl([], []),
      'images': new FormControl([], []),
      'published': new FormControl(true, [])
    });
  }

  saveSelection() {
    console.log(this.form);
    this.form.patchValue({ published: this._publication });
    if (this.form.valid === true) {
      this.selection = this.form.value;
      this.selectionService.createSelection(this.selection);
      this.alertService.toast(`La selection est ajoutée ${this.selection.name}`, 'info');
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
