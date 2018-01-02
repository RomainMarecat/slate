import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../alert/alert.service';
import { Product } from '../../../product/product';
import { ProductService } from '../../shared/product/product.service';
import { Media } from '../../../media/media';
import { Category } from '../../shared/navigation/category/category';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  form: FormGroup;
  product: Product;
  editorConfig: any;
  medias: Media[];

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any;
  categories$: Observable < Category[] > ;
  selected: Category[];
  isLoading: boolean;
  _publication = true;
  _descriptionModel: string;

  constructor(private productService: ProductService,
    private alertService: AlertService) {
    this.medias = [];
    this._descriptionModel = '';
  }

  ngOnInit() {
    this.createForm();
    this.editorConfig = {
      'editable': true,
      'spellcheck': false,
      'height': '5rem',
      'minHeight': '2rem',
      'placeholder': 'Enter Description',
      'translate': 'no',
      'toolbar': []
    };
  }

  createForm() {
    this.form = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
      ]),
      'description': new FormControl('', []),
      'reseller': new FormControl('', [
        Validators.required,
      ]),
      'url': new FormControl('', [
        Validators.required,
      ]),
      'published': new FormControl(true, []),
      'price': new FormControl(0, [
        Validators.required,
      ]),
      'images': new FormControl([], [
        Validators.required,
      ]),
      'category': new FormControl('', [
        Validators.required,
      ]),
    });
  }

  onImageChange(media: Media) {
    this.medias.push(media);
    this.form.patchValue({ images: this.medias.map((image: Media) => image.key) });
  }

  saveProduct() {
    this.form.patchValue({ description: this._descriptionModel, published: this._publication });
    if (this.form.valid) {
      this.product = this.form.value;
      this.productService.createProduct(this.product);
    }
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
  addCategory() {
    this.selected.forEach((category: Category) => {
      if (category.published === true) {
        this.form.patchValue({ category: category.key });
      }
    });
  }

  get name() {
    return this.form.get('name');
  }

  set name(name) {
    this.form.patchValue({ name: name });
  }

  get price() {
    return this.form.get('price');
  }

  set price(price) {
    this.form.patchValue({ price: price });
  }

  get descriptionModel() {
    return this._descriptionModel;
  }

  set descriptionModel(description) {
    this._descriptionModel = description;
  }

  get description() {
    return this.form.get('description');
  }

  set description(description) {
    this.form.patchValue({ description: description });
  }

  get reseller() {
    return this.form.get('reseller');
  }

  set reseller(reseller) {
    this.form.patchValue({ reseller: reseller });
  }

  get url() {
    return this.form.get('url');
  }

  set url(url) {
    this.form.patchValue({ url: url });
  }

  get category() {
    return this.form.get('category');
  }

  set category(category) {
    this.form.patchValue({ category: category });
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
