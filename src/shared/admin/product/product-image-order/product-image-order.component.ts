import { Component, OnInit, Output, Input, OnDestroy, EventEmitter } from '@angular/core';
import { Product } from '../../../product/shared/product';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-admin-product-image-order',
  templateUrl: './product-image-order.component.html',
  styleUrls: [ './product-image-order.component.scss' ]
})
export class ProductImageOrderComponent implements OnInit, OnDestroy {

  @Input('product') product: Product;
  @Output('imagesChanged') imagesChanged: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  constructor(private dragulaService: DragulaService) {
  }

  ngOnInit() {
    this.subscribeDragAndDrop();
  }

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
    this.imagesChanged.emit(this.product.images);
  }

  private onRemoveModel(args: any): void {
    const [ el, source ] = args;
  }

  ngOnDestroy() {
    this.dragulaService.dropModel.unsubscribe();
    this.dragulaService.removeModel.unsubscribe();
  }

}
