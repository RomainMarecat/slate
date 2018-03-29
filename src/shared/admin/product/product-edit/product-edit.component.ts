import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormArray } from '@angular/forms';
import { AlertService } from '../../../popup/alert.service';
import { StringService } from '../../../util/string.service';
import { Product } from '../../../product/product';
import { ProductService } from '../../shared/product/product.service';
import { Media } from '../../../media/media';
import { Category } from '../../shared/navigation/category/category';
import { CategoryService } from '../../shared/navigation/category/category.service';
import { Observable } from 'rxjs/Observable';
import { DocumentReference } from '@firebase/firestore-types';
import { ImageProductComponent } from '../../../media/cloudinary/image-product/image-product.component';
import { ProductFormType } from '../../shared/product/form-product';
import { AttributeService } from '../../../attribute/attribute.service';
import { PartnerService } from '../../shared/partner/partner.service';
import { Partner } from '../../../partner/partner';
import { Offer } from '../../../offer/offer';
import { Attribute } from '../../../attribute/attribute';
import { DragulaService } from 'ng2-dragula';
import { OfferService } from '../../shared/offer/offer.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';
import * as firebase from 'firebase/app';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: [ './product-edit.component.scss' ]
})
export class ProductEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  product: Product;
  editorConfig: any;
  medias: Media[] = [];
  partners: Partner[] = [];
  productOffers: Offer[] = [];
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any;
  categories: Category[] = [];
  selected: Category[] = [];
  filteredAttributes: Observable<any[]>;
  isLoading = false;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef<any>;
  @ViewChild(ImageProductComponent) ImageProductComponent: ImageProductComponent;
  imageStorageConfig: any;
  downloadURL: string;
  _publication = true;
  _descriptionModel = '';
  _attributesModel: any[] = [];

  /**
   *
   * @param activatedRoute
   * @param router
   * @param productService
   * @param alertService
   * @param categoryService
   * @param attributeService
   * @param dragulaService
   * @param partnerService
   * @param offerService
   */
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private alertService: AlertService,
              private categoryService: CategoryService,
              private attributeService: AttributeService,
              private dragulaService: DragulaService,
              private partnerService: PartnerService,
              private offerService: OfferService) {
  }

  /**
   * Init component
   */
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

  createImageStorageConfig() {
    this.imageStorageConfig = {
      model: this.product.key,
      alt: this.product.name,
    };
  }

  /**
   * product form
   */
  createForm() {
    const formType = new ProductFormType(this.product);
    this.form = formType.getForm();
  }

  /**
   * get product from route key
   */
  getProduct() {
    this.activatedRoute.params.subscribe((value: { key: string }) => {
      if (value.key) {
        const key = value.key;
        this.productService.getProduct(key)
          .subscribe((product: Product) => {
            this.product = product;
            this.descriptionModel = product.description;
            this.createForm();
            this.createImageStorageConfig();
            this.product.offers.forEach((offerKey: string) => {
              this.offerService.getOffer(offerKey).subscribe((offer: Offer) => {
                this.offers.push(ProductFormType.newOffer(offer));
              });
            });
            setTimeout(() => {
              this.observeUpdate();
            }, 2000);
          });
      }
    });
  }

  /**
   * observe form change
   */
  observeUpdate() {
    this.form.valueChanges
      .debounceTime(800)
      .subscribe((value) => {
        if (value.name) {
          const slug = StringService.slugify(value.name);
          this.form.patchValue({name: value.name, slug: slug, alias: value.name});
        }
      });
  }

  /**
   * create all category columns
   */
  createColumns() {
    this.columns = [ {
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

  /**
   * editor config for description product
   */
  createEditorConfig() {
    this.editorConfig = {
      'editable': true,
      'spellcheck': false,
      // 'height': '5rem',
      'minHeight': '10rem',
      'placeholder': 'Contenu de la description...',
      'translate': 'no',
      'toolbar': []
    };
  }

  /**
   * images array changes function of emitter
   * @param images
   */
  onImagesChange(images: Array<string>) {
    this.form.patchValue({
      images: images
    });
    this.alertService.toast('media order changed');
  }

  /**
   * image change function of emitter
   * @param media
   */
  onImageChange(media: Media) {
    this.medias.push(media);
    this.form.patchValue({
      images: this.medias.map((image: Media) => image.key)
    });
    this.alertService.toast('media saved');
  }

  onImageRefChanged(task: UploadTaskSnapshot) {
    this.downloadURL = task.downloadURL;
  }

  /**
   * reset all form control
   */
  reset() {
    this.medias = [];
    this._descriptionModel = '';
    this.selected = [];
    this.ImageProductComponent.clearUpload();
    this.form.reset({
      name: '',
      translations: {
        fr: ''
      },
      offers: [],
      description: '',
      published: true,
      images: [],
    });
  }

  /**
   * save the product and their offers
   */
  saveProduct() {
    this.form.patchValue({
      description: this._descriptionModel,
      published: this._publication
    });
    if (this.form.valid) {
      const offers = (this.form.value).offers;
      this.product = {
        ...this.product,
        ...this.form.value,
        ...{offers: offers.filter((o) => o.key && o.key !== '').map((off) => off.key)}
      };
      if (this.product.key) {
        if (this.product.published === true) {
          this.product.published_at = new Date();
        }
        this.productService.updateProduct(this.product)
          .then((doc) => {
            this.saveOffer(offers, {id: this.product.key});
          }, (err) => this.addError(err));
      } else {
        this.productService.createProduct(this.product)
          .then((doc: DocumentReference) => {
            this.saveOffer(this.form.get('offers').value, doc);
          }, (err) => this.addError(err));
      }
    }
  }

  /**
   * save an offer in db
   * @param offers
   * @param doc
   */
  saveOffer(offers: Offer[], doc: { id: string }) {
    offers.forEach((offer: Offer) => {
      // Set product value id
      offer.product = doc.id;

      if (offer.key) {
        this.offerService.updateOffer(offer).then(() => {
          this.addFinally();
        }, (err) => this.addError(err));
      } else {
        offer.published_at = new Date();
        this.offerService.createOffer(offer).then((res) => {
          this.addProductOffer(res.id);
        }, (err) => this.addError(err));
      }
    });
  }

  /**
   * delete an offer
   * @param index
   */
  deleteOffer(index: number) {
    this.offers.removeAt(index);
  }

  /**
   * add a new offer in form Array control
   * @param key
   */
  addProductOffer(key: string) {
    this.product.offers.push(key);
    this.productService.updateProduct(this.product).then((doc) => {
      this.addFinally();
    }, (err) => this.addError(err));
  }

  /**
   * error function to toast error on all subcriber
   * @param err
   */
  addError(err) {
    this.alertService.toast(`product error ${err}`);
  }

  /**
   * After the product saved
   */
  addFinally() {
    this.alertService.toast(`product saved ${this.product.translations.fr}`);
    this.reset();
    this.router.navigate([ '/admin/product' ]);
  }

  /**
   * subscribe to attributes
   */
  getAttributes() {
    this.attributeService.getAttributes()
      .take(1)
      .subscribe((attributes: Attribute[]) => {
        this._attributesModel = attributes.map((attribute: Attribute) => {
          return {label: attribute.translations.fr, options: attribute.terms};
        });
      });
  }

  /**
   * subscribe to categories
   */
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
  onSelect({selected}) {
    this.selected = [];
    this.selected.push(...selected);
  }

  /**
   * Add a new category in product
   */
  addCategory() {
    this.selected.forEach((category: Category) => {
      this.form.patchValue({category: category.key});
      this.alertService.toast('categorie selectionnée');
    });
  }

  /**
   * subscribe to partners list
   */
  getPartners() {
    this.partnerService.getPartners()
      .subscribe((partners: Partner[]) => {
        this.partners = partners;
      });
  }

  /**
   * Dra an drop system for attributes
   */
  subscribeDragAndDrop() {
    this.dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
    this.dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
  }

  private onDropModel(args: any): void {
    const [ el, target, source ] = args;
  }

  private onRemoveModel(args: any): void {
    const [ el, source ] = args;
  }

  /**
   * destroy all subscriptions
   */
  ngOnDestroy() {
    this.dragulaService.dropModel.unsubscribe();
    this.dragulaService.removeModel.unsubscribe();
  }

  /**
   * push a ne offer in form array offers
   */
  addOfferForm() {
    if (this.product && typeof this.product.offers === 'undefined') {
      this.product.offers = [];
    }
    this.offers.push(ProductFormType.newOffer());
  }

  /**
   * get offers controls cast to FormArray
   * @returns {FormArray}
   */
  get offers(): FormArray {
    return this.form.get('offers') as FormArray;
  }

  get name() {
    return this.form.get('name');
  }

  set name(name) {
    this.form.patchValue({name: name});
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
    this.form.patchValue({description: description});
  }

  get category() {
    return this.form.get('category');
  }

  set category(category) {
    this.form.patchValue({category: category});
  }

  get fr() {
    return this.form.get('translations').get('fr');
  }

  set fr(fr) {
    this.form.get('translations').patchValue({fr: fr});
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

  get attributes() {
    return this.form.get('attributes');
  }

  set attributes(attributes) {
    this.form.patchValue({attributes: attributes});
  }

  get attributesModel() {
    return this._attributesModel;
  }

  set attributesModel(attributesModel) {
    this._attributesModel = attributesModel;
  }
}
