import { Component, OnInit, Input } from '@angular/core';
import { HockeyProduct } from '../../../shared/product/shared/hockey-product';
import { DeviceService } from '../../../shared/device/device.service';

@Component({
  selector: 'app-product-attribute',
  templateUrl: './product-attribute.component.html',
  styleUrls: ['./product-attribute.component.scss']
})
export class ProductAttributeComponent implements OnInit {
  @Input('product') product: HockeyProduct;
  colors: string[];
  resizedImage: {
    height: number,
  };
  constructor(private deviceService: DeviceService) {
    this.colors = ['primary', 'warn', 'accent'];
    this.resizedImage = { height: 400 };
  }

  ngOnInit() {
    this.resizedImage.height = this.deviceService.isSmallAndDown() ? 300 : 400;
  }
}
