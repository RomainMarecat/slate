import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentReference } from '@firebase/firestore-types';
import { UploadTaskSnapshot } from '@firebase/storage-types';
import { TableColumn } from '@swimlane/ngx-datatable';
import { debounceTime, take } from 'rxjs/operators';
import { Attribute } from '../../../attribute/attribute';
import { AttributeService } from '../../../attribute/attribute.service';
import { Category } from '../../../category/category';
import { CategoryService } from '../../../category/category.service';
import { ImageProductComponent } from '../../../media/cloudinary/image-product/image-product.component';
import { Media } from '../../../media/media';
import { Offer } from '../../../offer/offer';
import { Partner } from '../../../partner/partner';
import { PartnerService } from '../../../partner/partner.service';
import { AlertService } from '../../../popup/alert.service';
import { Product } from '../../../product/shared/product';
import { ProductService } from '../../../product/shared/product.service';
import { StringService } from '../../../util/string.service';
import { OfferService } from '../../shared/offer/offer.service';
import { ProductFormType } from '../../shared/product/form-product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  form: FormGroup;
  product: Product;
  editorConfig: any;
  medias: Media[] = [];
  partners: Partner[] = [];
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: TableColumn[];
  categories: Category[] = [];
  selected: Category[] = [];
  isLoading = false;
  @ViewChild('checkboxHeader', {static: false}) checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell', {static: false}) checkboxCell: TemplateRef<any>;
  @ViewChild(ImageProductComponent, {static: false}) imageProductComponent: ImageProductComponent;
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
          this.form.patchValue({name: value.name, slug, alias: value.name});
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
      editable: true,
      spellcheck: false,
      // 'height': '5rem',
      minHeight: '10rem',
      placeholder: 'Contenu de la description...',
      translate: 'no',
      toolbar: []
    };
  }

  /**
   * images array changes function of emitter
   */
  onImagesChange(images: Array<string>) {
    this.form.patchValue({
      images
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
    this.imageProductComponent.clearUpload();
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
        ...{offers: offers.filter((o) => o.key && o.key !== '').map((offer) => offer.key)},
        ...{keywords: this.form.controls.name.value.toLowerCase().split(' ')}
      };
      this.updateProduct(offers);
    }
  }

  updateProduct(offers: Offer[]) {
    if (this.product.key) {
      if (this.product.published === true) {
        this.product.published_at = Math.floor(Date.now() / 1000) as unknown as any;
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
        offer.published_at = Math.floor(Date.now() / 1000) as unknown as any;
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
    this.form.patchValue({name});
  }

  get description() {
    return this.form.get('description');
  }

  set description(description) {
    this.form.patchValue({description});
  }

  get category() {
    return this.form.get('category');
  }

  set category(category) {
    this.form.patchValue({category});
  }

  get fr() {
    return this.form.get('translations').get('fr');
  }

  set fr(fr) {
    this.form.get('translations').patchValue({fr});
  }

  get published() {
    return this.form.get('published');
  }

  set published(published) {
    this.form.patchValue({published});
  }

  get attributes() {
    return this.form.get('attributes');
  }

  set attributes(attributes) {
    this.form.patchValue({attributes});
  }

  get attributesModel() {
    return this._attributesModel;
  }

  set attributesModel(attributesModel) {
    this._attributesModel = attributesModel;
  }
}
