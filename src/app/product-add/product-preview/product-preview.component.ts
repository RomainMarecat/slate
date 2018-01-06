import { Component, OnInit, Input } from '@angular/core';
import { ClothingProduct } from '../../../shared/product/clothing-product';
import { DateService } from '../../../shared/util/date.service';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss']
})
export class ProductPreviewComponent implements OnInit {
  @Input() product: ClothingProduct;
  @Input() user: any;
  now: string;
  // Current image size to display
  resizedImage = { height: '240', width: '240' };

  constructor(public dateService: DateService) {}

  ngOnInit() {
    this.now = this.dateService.getHumanReadableDate();
  }
}
