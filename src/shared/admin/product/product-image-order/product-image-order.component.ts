import { Component, OnInit, Output, Input, OnDestroy, EventEmitter } from '@angular/core';
import { Product } from '../../../product/shared/product';

@Component({
  selector: 'app-admin-product-image-order',
  templateUrl: './product-image-order.component.html',
  styleUrls: ['./product-image-order.component.scss']
})
export class ProductImageOrderComponent implements OnInit, OnDestroy {

  @Input() product: Product;
  @Output() imagesChanged: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  constructor() {
  }

  ngOnInit() {
    this.subscribeDragAndDrop();
  }

  subscribeDragAndDrop() {
    // this.dragulaService.dropModel.subscribe((value) => {
    //   this.onDropModel(value.slice(1));
    // });
    // this.dragulaService.removeModel.subscribe((value) => {
    //   this.onRemoveModel(value.slice(1));
    // });
  }

  // private onDropModel(args: any): void {
  //   const [el, target, source] = args;
  //   this.imagesChanged.emit(this.product.images);
  // }
  //
  // private onRemoveModel(args: any): void {
  //   const [el, source] = args;
  // }

  ngOnDestroy() {
    // this.dragulaService.dropModel.unsubscribe();
    // this.dragulaService.removeModel.unsubscribe();
  }

}
