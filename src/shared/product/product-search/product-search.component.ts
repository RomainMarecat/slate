import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../shared/product.service';
import { CarProduct } from '../shared/car-product';
import { Observable } from 'rxjs';
import { Category } from '../../category/category';
import { map, startWith, take } from 'rxjs/operators';
import { CategoryService } from '../../category/category.service';
import { Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  form: FormGroup = new FormGroup({
    'search': new FormControl({value: '', disabled: true}),
    'brand': new FormControl('', [Validators.required]),
    'model': new FormControl('', [Validators.required]),
  });
  showSearch = false;
  products: CarProduct[];
  filteredBrands: Observable<Category[]>;
  brandSelected: Category;
  brands: Category[] = [];
  models: Category[] = [];

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              private localizeRouterService: LocalizeRouterService) {
    this.filteredBrands = this.form.controls.brand.valueChanges
      .pipe(
        startWith(''),
        map((brand: string) => brand ? this.filterBrands(brand) : this.brands.slice())
      );
  }

  ngOnInit() {
    this.getCategories();
    this.getBrands();
  }

  getCategories() {
    this.categoryService.filters$.next([{
      column: 'level',
      operator: '==',
      value: 1
    }]);
    this.categoryService.orderBy$.next({column: 'name', direction: 'asc'});
    this.categoryService.getCategories()
      .pipe(
        take(1)
      )
      .subscribe(brands => this.brands = brands);

  }

  getBrands() {
    this.filteredBrands.subscribe((brands: Category[]) => {
      this.brandSelected = brands[0];
      if (brands && brands.length > 0) {
        this.categoryService.filters$.next([{
          column: 'level',
          operator: '==',
          value: 2
        }, {
          column: 'parent',
          operator: '==',
          value: brands[0].key
        }]);
        this.categoryService.orderBy$.next({column: 'name', direction: 'asc'});
        this.categoryService.getCategories()
          .pipe(
            take(1)
          )
          .subscribe(models => {
            this.models = models;
          });
      }
    });
  }

  filterBrands(name: string): Category[] {
    return this.brands.filter(brand => brand.name.toLowerCase().indexOf(name.toLowerCase()) >= 0 ||
      brand.translations.fr.toLowerCase().indexOf(name.toLowerCase()) >= 0);
  }

  onActiveSearch(activate: boolean) {
    this.showSearch = activate;
  }

  onSearch() {
    if (this.form.valid) {
      this.router.navigate(['/selection/' + this.form.getRawValue().model + '/products']);
    }
  }
}
