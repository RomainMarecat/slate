import { Component, OnInit, Input } from '@angular/core';
import { Product } from './../../../../shared/product/product';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-admin-product-image-order',
  templateUrl: './product-image-order.component.html',
  styleUrls: ['./product-image-order.component.scss']
})
export class ProductImageOrderComponent implements OnInit {

  @Input('product') product: Product;

  constructor(private dragulaService: DragulaService) {}

  ngOnInit() {
    this.subscribeDragAndDrop();
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
    console.log(args);
    const [e, el, container] = args;
    console.log(e, el, container);
  }

}
