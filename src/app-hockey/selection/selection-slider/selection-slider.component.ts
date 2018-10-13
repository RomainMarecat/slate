import { Component, OnInit, Input } from '@angular/core';
import { Selection } from '../../../shared/selection/selection';
import { SelectionService } from '../../../shared/selection/selection.service';
import { ProductService } from '../../../shared/product/shared/product.service';
import { Product } from '../../../shared/product/shared/product';

@Component({
  selector: 'app-hockey-selection-slider',
  templateUrl: './selection-slider.component.html',
  styleUrls: ['./selection-slider.component.scss']
})
export class SelectionSliderComponent implements OnInit {
  // Input selection
  @Input() selection: Selection;

  // products: Collection
  products: Product[] = [];

  constructor(private selectionService: SelectionService,
    private productService: ProductService) {}

  ngOnInit() {
    this.getProductsBySelection(this.selection);
  }

  /**
   * Fetch products by Selection Type
   * @param Selection selection
   */
  getProductsBySelection(selection: Selection) {
    if (selection && selection.products && selection.products.length > 0) {
      this.productService.getProducts()
        .map((products: Product[]) =>
          products.filter((product: Product) =>
            selection &&
            selection.products &&
            selection.products.length > 0 &&
            selection.products.includes(product.key)))
        .subscribe((products: Product[]) => {
          this.products = products;
        });
    }
  }
}
