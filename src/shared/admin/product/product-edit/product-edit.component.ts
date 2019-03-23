import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup } from '@angular/forms';
import { AlertService } from '../../../popup/alert.service';
import { StringService } from '../../../util/string.service';
import { Product } from '../../../product/shared/product';
import { Media } from '../../../media/media';
import { CategoryService } from '../../../category/category.service';
import { Observable } from 'rxjs';
import { DocumentReference } from '@firebase/firestore-types';
import { ImageProductComponent } from '../../../media/cloudinary/image-product/image-product.component';
import { ProductFormType } from '../../shared/product/form-product';
import { AttributeService } from '../../../attribute/attribute.service';
import { Partner } from '../../../partner/partner';
import { Category } from '../../../category/category';
import { Offer } from '../../../offer/offer';
import { Attribute } from '../../../attribute/attribute';
import { OfferService } from '../../shared/offer/offer.service';
import { UploadTaskSnapshot } from '@firebase/storage-types';
import { ProductService } from '../../../product/shared/product.service';
import { debounceTime, take } from 'rxjs/operators';
import { PartnerService } from '../../../partner/partner.service';
import { TableColumn } from '@swimlane/ngx-datatable';
import { LocalizeRouterService } from 'localize-router';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

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
  partners: Partner[] = [];
  productOffers: Offer[] = [];
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: TableColumn[];
  categories: Category[] = [];
  selected: Category[] = [];
  filteredAttributes: Observable<any[]>;
  isLoading = false;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef<any>;
  @ViewChild(ImageProductComponent) ImageProductComponent: ImageProductComponent;
  imageStorageConfig: any;
  downloadURL: string;
  _attributesModel: any[] = [];
  isSaving = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private alertService: AlertService,
              private categoryService: CategoryService,
              private attributeService: AttributeService,
              private partnerService: PartnerService,
              private offerService: OfferService,
              private localizeRouterService: LocalizeRouterService) {
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
    // this.subscribeDragAndDrop();
    this.getPartners();
  }

  /**
   * Create image configuration
   */
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
    this.activatedRoute.params.subscribe((value: {key: string}) => {
      if (value.key) {
        const key = value.key;
        this.productService.getProduct(key)
          .subscribe((product: Product) => {
            this.product = product;
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
      .pipe(
        debounceTime(800)
      )
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
    }];
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
   */
  onImagesChange(images: Array<string>) {
    this.form.patchValue({
      images: images
    });
    this.alertService.toast('media order changed');
  }

  /**
   * image change function of emitter
   */
  onImageChange(media: Media) {
    this.medias.push(media);
    this.form.patchValue({
      images: this.medias.map((image: Media) => image.key)
    });
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

  /**
   * reset all form control
   */
  reset() {
    this.medias = [];
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
    this.isSaving = true;
    if (this.form.valid) {
      const offers = (this.form.value).offers;
      this.product = {
        ...this.product,
        ...this.form.value,
        ...{offers: offers.filter((o) => o.key && o.key !== '').map((off) => off.key)},
        ...{keywords: this.form.controls.name.value.toLowerCase().split(' ')}
      };
      if (this.product.key) {
        if (this.product.published === true) {
          this.product.published_at = Timestamp.now();
        }
        this.productService.updateProduct(this.product)
          .subscribe((doc) => {
            this.isSaving = false;
            this.saveOffer(offers, {id: this.product.key});
          }, (err) => {
            this.isSaving = false;
            this.addError(err);
          });
      } else {

        this.productService.createProduct(this.product)
          .subscribe((doc: DocumentReference) => {
            this.isSaving = false;
            this.saveOffer(this.form.get('offers').value, doc);
          }, (err) => {
            this.isSaving = false;
            this.addError(err);
          });
      }
    }
  }

  /**
   * save an offer in db
   */
  saveOffer(offers: Offer[], doc: {id: string}) {
    offers.forEach((offer: Offer) => {
      // Set product value id
      offer.product = doc.id;

      if (offer.key) {
        this.offerService.updateOffer(offer).then(() => {
          this.addFinally();
        }, (err) => this.addError(err));
      } else {
        offer.published_at = Timestamp.now();
        this.offerService.createOffer(offer).then((res) => {
          this.addProductOffer(res.id);
        }, (err) => this.addError(err));
      }
    });
  }

  /**
   * delete an offer
   */
  deleteOffer(index: number) {
    this.offers.removeAt(index);
  }

  /**
   * add a new offer in form Array control
   */
  addProductOffer(key: string) {
    this.product.offers.push(key);
    this.productService.updateProduct(this.product).subscribe((doc) => {
      this.addFinally();
    }, (err) => this.addError(err));
  }

  /**
   * error function to toast error on all subcriber
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
    this.router.navigate(['/admin/product']);
  }

  /**
   * subscribe to attributes
   */
  getAttributes() {
    this.attributeService.getAttributes()
      .pipe(
        take(1)
      )
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

  // /**
  //  * Dra an drop system for attributes
  //  */
  // subscribeDragAndDrop() {
  //   this.dragulaService.dropModel.subscribe((value) => {
  //     this.onDropModel(value.slice(1));
  //   });
  //   this.dragulaService.removeModel.subscribe((value) => {
  //     this.onRemoveModel(value.slice(1));
  //   });
  // }
  //
  // private onDropModel(args: any): void {
  //   const [el, target, source] = args;
  // }
  //
  // private onRemoveModel(args: any): void {
  //   const [el, source] = args;
  // }

  /**
   * destroy all subscriptions
   */
  ngOnDestroy() {
    // this.dragulaService.dropModel.unsubscribe();
    // this.dragulaService.removeModel.unsubscribe();
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
