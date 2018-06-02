import { Component, OnInit } from '@angular/core';
import { CarProduct } from '../../../shared/product/car-product';
import { Category } from '../../../shared/category/category';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/product/product.service';
import { DeviceService } from '../../../shared/device/device.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { CategoryService } from '../../../shared/category/category.service';
import { OfferService } from '../../../shared/offer/offer.service';
import { CarOffer } from '../../../shared/offer/offer';
import { TranslateService } from '@ngx-translate/core';
import { Comment } from '../../../shared/comment/comment';
import { UserService } from '../../../shared/user/user.service';
import { CommentService } from '../../../shared/comment/comment.service';
import * as moment from 'moment';

@Component({
  selector: 'app-car-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: [ './offer-detail.component.scss' ]
})
export class OfferDetailComponent implements OnInit {
  offer: CarOffer;
  product: CarProduct;
  brand: Category;
  model: Category;
  // User comments
  comments: Comment[] = [];

  resizedImage: {
    height: number,
  };
  items: any[];

  isActivatedPhone = false;
  isFavorite = false;

  /**
   *
   * @param {Meta} meta
   * @param {Title} title
   * @param {ActivatedRoute} activatedRoute
   * @param {ProductService} productService
   * @param userService
   * @param commentService
   * @param offerService
   * @param {DeviceService} deviceService
   * @param {AlertService} alertService
   * @param categoryService
   * @param translate
   */
  constructor(private meta: Meta,
              private title: Title,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private userService: UserService,
              private commentService: CommentService,
              private offerService: OfferService,
              private deviceService: DeviceService,
              private alertService: AlertService,
              private categoryService: CategoryService,
              private translate: TranslateService) {
    this.resizedImage = {height: 400};
  }

  ngOnInit() {
    this.getOffer();
    this.resizedImage.height = this.deviceService.isSmallAndDown() ? 300 : 400;
    this.getComments();
  }

  getOffer() {
    this.activatedRoute.params.subscribe((value: { key: string }) => {
      if (value.key) {
        this.offerService.getOffer(value.key)
          .subscribe((offer: CarOffer) => {
            this.meta.addTag({name: 'description', content: offer.description});
            offer.published_at = moment(offer.published_at, 'x').format('DD/MM/YYYY HH:mm');
            this.offer = offer;

            if (offer.brand) {
              this.getBrand(offer.brand);
            }

            this.title.setTitle(this.title.getTitle() + ' ' + offer.mileage + ' km');

            this.items = [
              {label: 'fuel.label', value: offer.fuel},
              {label: 'gearbox.label', value: offer.gearbox},
              {label: 'mileage', value: offer.mileage},
              {label: 'regDate', value: offer.regDate},
              {
                label: 'negotiable_price',
                value: offer.negotiable_price === true ? this.translate.instant('yes') : this.translate.instant('no')
              },
            ];
          });
      }
    });
  }

  getBrand(key: string) {
    this.categoryService.getCategory(key)
      .subscribe((brand) => {
        this.brand = brand;
        if (this.offer.model) {
          this.getModel(this.offer.model);
        }
      });
  }

  getModel(key: string) {
    this.categoryService.getCategory(key)
      .subscribe((model) => {
        this.model = model;
        this.translate.get([ 'meta.title.offer-detail', 'meta.description.offer-detail' ])
          .subscribe((translations: string[]) => {
            this.meta.addTag({name: 'description', content: translations[ 'meta.description.offer-detail' ]});
            this.title.setTitle((this.brand && this.brand.name ? this.brand.name + ' ' : '') +
              (this.model && this.model.name ? this.model.name + ' ' : '') +
              translations[ 'meta.title.offer-detail' ]);
          });
      });
  }

  sendMessage() {

  }

  sendEmail() {

  }

  getComments() {
    this.commentService.getComments()
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
      }, (err) => console.error(err));
  }


  onCommentCreated(comment: Comment) {
    if (!this.userService.getUser()) {
      this.alertService.toast('snackbar.guard.unauthenticated');
      return;
    }
    comment.creator = this.userService.getUser().displayName;
    comment.commentTime = new Date();
    comment.entity_key = this.offer.key;
    comment.entity_type = 'Offer';
    comment.order = this.comments.length + 1;
    this.commentService.createComment(comment).then((doc) => {
      this.alertService.toast(this.translate.instant('comments.added'), 'success');
    }, (err) => {
      this.alertService.toast(err, 'error');
    });
  }

  togglePhone(event: MouseEvent) {
    this.isActivatedPhone = !this.isActivatedPhone;
  }

  toggleFavorite(event: MouseEvent) {
    this.isFavorite = !this.isFavorite;
  }
}
