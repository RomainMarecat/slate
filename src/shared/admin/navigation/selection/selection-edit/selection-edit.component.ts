import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionService } from '../../../shared/navigation/selection/selection.service';
import { Selection } from '../../../../selection/selection';
import { SelectionFormType } from '../../../shared/navigation/selection/form-selection';
import { FormGroup } from '@angular/forms';
import { AlertService } from '../../../../popup/alert.service';
import { HockeyProduct } from '../../../../product/hockey-product';
import { Product } from '../../../../product/product';
import { Media } from '../../../../media/media';
import { StringService } from '../../../../util/string.service';
import { ProductService } from '../../../shared/product/product.service';

@Component({
  selector: 'app-selection-edit',
  templateUrl: './selection-edit.component.html',
  styleUrls: [ './selection-edit.component.scss' ]
})
export class SelectionEditComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;

  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef<any>;
  @ViewChild('publicationCell') publicationCell: TemplateRef<any>;

  columnsProduct: any;
  associatedProducts: HockeyProduct[];

  columnsParent: any;
  parents: Selection[];

  selectedProducts: Product[] = [];
  selectedParent: Selection[] = [];
  isLoadingProducts: boolean;
  isLoadingParents: boolean;

  form: FormGroup;
  selection: Selection;
  medias: Media[] = [];
  _publication = true;

  constructor(private activatedRoute: ActivatedRoute,
              private selectionService: SelectionService,
              private alertService: AlertService,
              private router: Router,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.columnsProduct = [ {
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
      flexGrow: 1,
      cellTemplate: this.publicationCell
    }, {
      prop: 'category',
      name: 'category',
      flexGrow: 1
    } ];
    this.columnsParent = [ {
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
      prop: 'translations.fr',
      name: 'fr',
      flexGrow: 1
    }, {
      prop: 'published',
      name: 'published',
      flexGrow: 1,
      cellTemplate: this.publicationCell
    }, {
      prop: 'level',
      name: 'level',
      flexGrow: 1
    } ];
    this.createForm();
    this.getSelection();
    this.isLoadingProducts = true;
    this.isLoadingParents = true;

    this.selectionService.getSelections()
      .subscribe((parents: Selection[]) => {
        this.parents = parents;
        this.parents.forEach((parent) => {
          if (this.selection && parent.key === this.selection.parent) {
            this.selectedParent.push(parent);
          }
        });
        this.isLoadingParents = false;
      });
    this.productService.getProducts()
      .subscribe((products: Product[]) => {
        this.associatedProducts = products.sort((prev: Product, next: Product) => {
          return prev.translations.fr > next.translations.fr ? 1 : -1;
        });
        if (this.selection && this.selection.products) {
          this.associatedProducts.forEach((product: Product) => {
            this.selection.products.forEach((keyProduct: string) => {
              if (product.key === keyProduct) {
                this.selectedProducts.push(product);
              }
            });

          });
        }
        this.isLoadingProducts = false;
      });
  }

  observeUpdate() {
    this.form.valueChanges
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe((value) => {
        if (value.name) {
          const slug = StringService.slugify(value.name);
          this.form.patchValue({name: value.name, slug: slug, alias: value.name});
        }
      });
  }

  getSelection() {
    this.activatedRoute.params.subscribe((value: { key: string }) => {
      if (value.key) {
        const key = value.key;
        this.selectionService.getSelection(key)
          .subscribe((selection: Selection) => {
            this.selection = selection;
            this.createForm(selection);
            this.observeUpdate();
          });
      }
    });
  }

  createForm(selection ?: Selection) {
    const formType = new SelectionFormType(selection);
    this.form = formType.getForm();
  }

  saveSelection() {
    this.form.patchValue({published: this._publication});
    if (this.form.valid === true) {
      this.selection = {...this.selection, ...this.form.value};
      if (this.selection.published === true) {
        this.selection.published_at = new Date();
      }
      this.selectionService.updateSelection(this.selection);
      this.alertService.toast(`La selection ${this.selection.name} est mise à jour`, 'info');
      this.router.navigate([ '/admin/navigation/selection' ]);
    }
  }

  onImageChange(media: Media) {
    this.medias.push(media);
    this.form.patchValue({images: this.medias.map((image: Media) => image.key)});
  }

  get products() {
    return this.form.get('products');
  }

  set products(products) {
    this.form.patchValue({products: products});
  }

  get publication() {
    return this._publication;
  }

  set publication(publication) {
    this._publication = publication;
  }
  
  /**
   * On select add new list in selection array
   * @param {any} selected
   */
  onSelectParent({selected}) {
    this.selectedParent = [];
    this.selectedParent.push(selected[ 0 ]);
    this.selectedParent.forEach((selection: Selection) => {
      this.form.patchValue({parent: selection.key, level: selection.level + 1});
    });
  }

  /**
   * On select add new list in selection array
   * set at published at now et activate published to true
   * @param {any} selected
   */
  onSelectProduct({selected}) {
    const productsKey = [];
    this.selectedProducts.splice(0, this.selectedProducts.length);
    this.selectedProducts.push(...selected);
    this.selectedProducts.forEach((product: Product) => {
      productsKey.push(product.key);
      this.form.patchValue({products: productsKey});
    });
  }

  /**
   * set at published at now et activate published to true
   */
  addProducts() {
    this.selectedProducts.forEach((product: HockeyProduct) => {
      if (product.published === true) {
        this.form.patchValue({products: this.form.get('products').value.push(product.key)});
      }
    });
  }
}
