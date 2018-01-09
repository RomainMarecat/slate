import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../../popup/alert.service';
import { StringService } from '../../../../shared/util/string.service';
import { Product } from '../../../product/product';
import { ProductService } from '../../shared/product/product.service';
import { Media } from '../../../media/media';
import { Category } from '../../shared/navigation/category/category';
import { CategoryService } from '../../shared/navigation/category/category.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import DocumentReference = firebase.firestore.DocumentReference;
import { ProductImageComponent } from './../../../product/product-image/product-image.component';
import { ProductFormType } from './../../shared/product/form-product';
import { map, switchMap, combineLatest, retry, timeout, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { AttributeService } from '../../../attribute/attribute.service';
import { Attribute } from '../../../attribute/attribute';
import { startWith } from 'rxjs/operators/startWith';

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
  filteredAttributes: Observable < any[] > ;

  isLoading: boolean;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef < any > ;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef < any > ;
  @ViewChild(ProductImageComponent) productImageComponent: ProductImageComponent;

  _publication = true;
  _descriptionModel: string;
  _attributesModel: Attribute[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private alertService: AlertService,
    private categoryService: CategoryService,
    private attributeService: AttributeService) {
    this.medias = [];
    this._descriptionModel = '';
  }

  ngOnInit() {
    this.createForm();
    this.getProduct();
    this.createColumns();
    this.createEditorConfig();
    this.getCategories();
    this.getAttributes();
  }

  createForm() {
    const formType = new ProductFormType(this.product);
    this.form = formType.getForm();
  }

  getProduct() {
    this.activatedRoute.params.subscribe((value: { key: string }) => {
      if (value.key) {
        const key = value.key;
        this.productService.getProduct(key)
          .subscribe((product: Product) => {
            this.product = product;
            this.descriptionModel = product.description;
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
          this.form.patchValue({ name: value.name, slug: slug, alias: value.name });
        }
      });
  }

  createColumns() {
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
  }

  createEditorConfig() {
    this.editorConfig = {
      'editable': true,
      'spellcheck': false,
      'height': '5rem',
      'minHeight': '2rem',
      'placeholder': 'Contenu de la description...',
      'translate': 'no',
      'toolbar': []
    };
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
      translations: {
        fr: ''
      },
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
      this.product = { ...this.product, ...this.form.value };
      if (this.product.key) {
        if (this.product.published === true) {
          this.product.published_at = new Date();
        }
        console.log('Update product', this.product);
        this.productService.updateProduct(this.product)
          .then((doc) => {
            this.alertService.toast(`product updated ${this.product.translations.fr}`);
            this.reset();
          }, (err) => {
            this.alertService.toast(`product error ${err}`);
          });
        this.router.navigate(['/admin/product']);
      } else {
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
  }

  getAttributes() {
    this.attributeService.getAttributes()
      .subscribe((attributes: Attribute[]) => {
        this._attributesModel = attributes;
      });
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
      this.alertService.toast('categorie selectionnée');
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

  get fr() {
    return this.form.get('translations').get('fr');
  }

  set fr(fr) {
    this.form.get('translations').patchValue({ fr: fr });
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

  get attributes() {
    return this.form.get('attributes');
  }

  set attributes(attributes) {
    this.form.patchValue({ attributes: attributes });
  }

  get attributesModel() {
    return this._attributesModel;
  }

  set attributesModel(attributesModel) {
    this._attributesModel = attributesModel;
  }
}
