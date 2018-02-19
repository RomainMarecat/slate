import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/product/product.service';
import { CommentService } from '../../../shared/comment/comment.service';
import { DeviceService } from '../../../shared/device/device.service';
import { HockeyProduct } from '../../../shared/product/hockey-product';
import { Comment } from '../../../shared/comment/comment';

@Component({
  selector: 'app-hockey-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: HockeyProduct;

  // User comments
  comments: Comment[] = [];

  resizedImage: {
    height: number,
  };

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private deviceService: DeviceService,
    private commentService: CommentService) {
    this.resizedImage = { height: 400 };
  }

  ngOnInit() {
    this.getProduct();
    this.resizedImage.height = this.deviceService.isSmallAndDown() ? 300 : 400;
  }

  getProduct() {
    this.activatedRoute.params.subscribe((value: { key: string }) => {
      if (value.key) {
        const key = value.key.substring(0, value.key.indexOf('-'));
        if (key) {
          this.productService.getProduct(key)
            .subscribe((product: HockeyProduct) => {
              product.attributes = product.attributes.map((attribute: any) => {
                attribute.label = attribute.label.trim().replace(/ /g, '');
                return attribute;
              });
              this.product = product;
              this.getMockComments();
            });
        }
      }
    });
  }

  updateScoreProduct(event: any) {

  }

  getComments() {
    this.commentService.getComments()
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
      }, (err) => console.log(err));
  }

  getMockComments() {
    this.comments = [{
        key: '154563263',
        commentText: 'Lorem Ipsum',
        commentTime: new Date(),
        creator: 'Many Court',
        entity_key: '5453236',
        entity_type: 'product',
        order: 1
      },
      {
        key: '154563263',
        commentText: 'Lorem Ipsum',
        commentTime: new Date(),
        creator: 'Many Court',
        entity_key: '5453236',
        entity_type: 'product',
        order: 2
      }
    ];
  }
}
