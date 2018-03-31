import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { CarProduct } from '../car-product';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../category/category';
import { map, startWith } from 'rxjs/operators';
import { CategoryService } from '../../category/category.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: [ './product-search.component.scss' ]
})
export class ProductSearchComponent implements OnInit {

  form: FormGroup = new FormGroup({
    'search': new FormControl({value: '', disabled: true}),
    'brand': new FormControl(''),
    'model': new FormControl(''),
  });
  showSearch = false;
  products: CarProduct[];
  filteredBrands: Observable<Category[]>;
  filteredModels: Observable<Category[]>;
  brandSelected: Category;
  brands: Category[] = [];
  models: Category[] = [];

  constructor(private productService: ProductService,
              private categoryService: CategoryService) {
    this.filteredBrands = this.form.controls.brand.valueChanges
      .pipe(
        startWith(''),
        map((brand: string) => brand ? this.filterBrands(brand) : this.brands.slice())
      );

    this.filteredModels = this.form.controls.model.valueChanges
      .pipe(
        startWith(''),
        map((model: string) => model ? this.filterModels(model) : this.models.slice())
      )
    ;
  }

  ngOnInit() {
    this.categoryService.filters$.next([ {
      column: 'level',
      operator: '==',
      value: 1
    } ]);
    this.categoryService.orderBy$.next({column: 'name', direction: 'asc'});
    this.categoryService.getCategories()
      .take(1)
      .subscribe(brands => this.brands = brands);

    this.filteredBrands.subscribe((brands: Category[]) => {
      this.brandSelected = brands[0];
      if (brands && brands.length > 0) {
        this.categoryService.filters$.next([ {
          column: 'level',
          operator: '==',
          value: 2
        }, {
          column: 'parent',
          operator: '==',
          value: brands[0].key
        } ]);
        this.categoryService.orderBy$.next({column: 'name', direction: 'asc'});
        this.categoryService.getCategories()
          .take(1)
          .subscribe(models => {
            this.models = models;
          });
      }
    });

    this.filteredModels.subscribe((models: Category[]) => {
    });
  }

  filterBrands(name: string): Category[] {
    return this.brands.filter(brand => brand.name.toLowerCase().indexOf(name.toLowerCase()) >= 0 ||
          brand.translations.fr.toLowerCase().indexOf(name.toLowerCase()) >= 0);
  }

  filterModels(name: string): Category[] {
    return this.models.filter(model => model.name.toLowerCase().indexOf(name.toLowerCase()) >= 0 ||
          model.translations.fr.toLowerCase().indexOf(name.toLowerCase()) >= 0 );
  }

  onActiveSearch(activate: boolean) {
    this.showSearch = activate;
  }

  onSearch() {
    this.productService.filters$.next(null);
    if (this.form.valid) {
      this.productService.filters$.next([ {
        operator: '==',
        value: this.form.controls.search.value.toLowerCase(),
        column: 'name'
      } ]);
    }
  }

}
