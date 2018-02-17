import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AlertService } from '../../../popup/alert.service';
import { StringService } from '../../../../shared/util/string.service';
import { Product } from '../../../product/product';
import { ProductService } from '../../shared/product/product.service';
import { Media } from '../../../media/media';
import { Category } from '../../shared/navigation/category/category';
import { CategoryService } from '../../shared/navigation/category/category.service';
import { Observable } from 'rxjs/Observable';
import { DocumentReference } from '@firebase/firestore-types';
import { ProductImageComponent } from './../../../product/product-image/product-image.component';
import { ProductFormType } from './../../shared/product/form-product';
import { AttributeService } from '../../../attribute/attribute.service';
import { PartnerService } from '../../shared/partner/partner.service';
import { Partner } from '../../../partner/partner';
import { Offer } from '../../../offer/offer';
import { Attribute } from '../../../attribute/attribute';
import { DragulaService } from 'ng2-dragula';
import { OfferService } from '../../shared/offer/offer.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  product: Product;
  editorConfig: any;
  medias: Media[] = [];
  partnersModel: Partner[] = [];
  productOffers: Offer[] = [];
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
  _descriptionModel = '';
  _attributesModel: Attribute[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private alertService: AlertService,
    private categoryService: CategoryService,
    private attributeService: AttributeService,
    private dragulaService: DragulaService,
    private partnerService: PartnerService,
    private offerService: OfferService) {}

  ngOnInit() {
    this.createForm();
    this.getProduct();
    this.createColumns();
    this.createEditorConfig();
    this.getCategories();
    this.getAttributes();
    this.subscribeDragAndDrop();
    this.getPartners();
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

  onImagesChange(images: Array < string > ) {
    this.form.patchValue({
      images: images
    });
    this.alertService.toast('media order changed');
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
      external_url: '',
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

  getPartners() {
    this.partnerService.getPartners()
      .subscribe((partners: Partner[]) => {
        this.partnersModel = partners;
      });
  }

  getProductOffers() {
    this.offerService.getOffers()
      .subscribe((offers: Offer[]) => {
        this.productOffers = offers;
      });
  }

  subscribeDragAndDrop() {
    this.dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    this.dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    this.dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    this.dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });
  }

  private onDrag(args) {
    const [e, el] = args;
    // do something
  }

  private onDrop(args) {
    const [e, el] = args;
    // do something
  }

  private onOver(args) {
    const [e, el, container] = args;
    // do something
  }

  private onOut(args) {
    const [e, el, container] = args;
    // do something
  }

  ngOnDestroy() {
    this.dragulaService.drag.unsubscribe();
    this.dragulaService.drop.unsubscribe();
    this.dragulaService.over.unsubscribe();
    this.dragulaService.out.unsubscribe();
  }

  addPartnerForm() {

  }

  get name() {
    return this.form.get('name');
  }

  set name(name) {
    this.form.patchValue({ name: name });
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

  get partners() {
    return this.form.get('partners');
  }

  set partners(partners) {
    this.form.get('partners').patchValue({ partners: partners });
  }

  get offers() {
    return this.form.get('offers');
  }

  set offers(offers) {
    this.form.get('offers').patchValue({ offers: offers });
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
