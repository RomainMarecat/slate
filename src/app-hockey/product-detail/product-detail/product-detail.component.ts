import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/product/shared/product.service';
import { CommentService } from '../../../shared/comment/shared/comment.service';
import { DeviceService } from '../../../shared/device/device.service';
import { UserService } from '../../../shared/user/shared/user.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { HockeyProduct } from '../../../shared/product/shared/hockey-product';
import { Comment } from '../../../shared/comment/shared/comment';
import { Filter } from '../../../shared/facet/filter/shared/filter';
import { Meta, Title } from '@angular/platform-browser';

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

  constructor(private meta: Meta,
              private title: Title,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private deviceService: DeviceService,
              private commentService: CommentService,
              private userService: UserService,
              private alertService: AlertService) {
    this.resizedImage = {height: 400};
  }

  ngOnInit() {
    this.getProduct();
    this.resizedImage.height = this.deviceService.isSmallAndDown() ? 300 : 400;
  }

  getProduct() {
    this.activatedRoute.params.subscribe((value: {key: string}) => {
      if (value.key) {
        const key = value.key.substring(0, value.key.indexOf('-'));
        if (key) {
          this.productService.getProduct(key)
            .subscribe((product: HockeyProduct) => {
              this.meta.addTag({name: 'description', content: product.description});
              this.title.setTitle(product.name);
              product.attributes = product.attributes.map((attribute: any) => {
                attribute.label = attribute.label.trim().replace(/ /g, '');
                return attribute;
              });
              this.product = product;
              this.getComments();
            });
        }
      }
    });
  }

  updateScoreProduct(event: any) {

  }

  onCommentCreated(comment: Comment) {
    comment.creator = this.userService.getUser().displayName;
    comment.commentTime = new Date();
    comment.entity_key = this.product.key;
    comment.entity_type = 'Product';
    comment.order = this.comments.length + 1;
    this.commentService.createComment(comment).subscribe((doc) => {
      this.alertService.toast('Commentaire enregistré', {panelClass: 'success'});
    }, (err) => {
      this.alertService.toast(err, {panelClass: 'error'});
    });
  }

  getComments() {
    const filters: Filter[] = [{
      column: 'entity_key',
      operator: '==',
      value: this.product.key
    }, {
      column: 'entity_type',
      operator: '==',
      value: 'Product',
    }];
    this.commentService.filters$.next(filters);
    this.commentService.getComments()
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
      }, (err) => console.error(err));
  }
}
