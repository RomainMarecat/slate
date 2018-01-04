import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../alert/alert.service';
import { Product } from '../../../product/product';
import { ProductService } from '../../shared/product/product.service';
import { Media } from '../../../media/media';
import { Category } from '../../shared/navigation/category/category';
import { CategoryService } from '../../shared/navigation/category/category.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import DocumentReference = firebase.firestore.DocumentReference;
import { ProductImageComponent } from './../../../product/product-image/product-image.component';

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
  categories: Category[] = [];
  selected: Category[] = [];
  isLoading: boolean;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef < any > ;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef < any > ;

  @ViewChild(ProductImageComponent) productImageComponent: ProductImageComponent;
  _publication = true;
  _descriptionModel: string;

  constructor(private productService: ProductService,
    private alertService: AlertService,
    private categoryService: CategoryService) {
    this.medias = [];
    this._descriptionModel = '';
  }

  ngOnInit() {
    this.createForm();
    this.columns = [{
      width: 50,
      sortable: false,
      canAutoResize: false,
      draggable: false,
      resizeable: false,
      cellTemplate: this.checkboxCell,
      headerTemplate: this.checkboxHeader,
    }, {
      prop: 'key',
      name: 'key',
      flexGrow: 1
    }, {
      prop: 'name',
      name: 'name',
      flexGrow: 1
    }, {
      prop: 'published',
      name: 'published',
      flexGrow: 1
    }, ];
    this.editorConfig = {
      'editable': true,
      'spellcheck': false,
      'height': '5rem',
      'minHeight': '2rem',
      'placeholder': 'Enter Description',
      'translate': 'no',
      'toolbar': []
    };
    this.getCategories();
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
    this.form.patchValue({
      images: this.medias.map((image: Media) => image.key)
    });
    this.alertService.toast('media saved');
  }

  reset() {
    this.medias = [];
    this._descriptionModel = '';
    this.selected = [];
    this.productImageComponent.clearUpload();
    this.form.reset({
      name: '',
      description: '',
      reseller: '',
      url: '',
      published: true,
      price: 0,
      images: [],
    });
  }

  saveProduct() {
    this.form.patchValue({
      description: this._descriptionModel,
      published: this._publication
    });
    if (this.form.valid) {
      this.product = this.form.value;
      console.log('New product', this.product);
      this.productService.createProduct(this.product)
        .then((doc: DocumentReference) => {
          this.alertService.toast(`product added ${doc.id}`);
          this.reset();
        }, (err) => {
          this.alertService.toast(`product error ${err}`);
        });
    }
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  /**
   * On select add reinit and add category in selection array
   * @param any selected
   */
  onSelect({ selected }) {
    this.selected = [];
    this.selected.push(...selected);
  }

  addCategory() {
    this.selected.forEach((category: Category) => {
      this.form.patchValue({ category: category.key });
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
