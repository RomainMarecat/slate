import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductService } from '../../shared/product/product.service';
import { MockCommentService } from '../../shared/comment/mock-comment.service';
import { MockOfferService } from '../../shared/offer/mock-offer.service';
import { MockAlertService } from '../../shared/popup/mock-alert.service';
import { AlertService } from '../../shared/popup/alert.service';
import { MockProductService } from '../../shared/product/mock-product.service';
import { OfferService } from '../../shared/offer/offer.service';
import { DeviceService } from '../../shared/device/device.service';
import { CommentService } from '../../shared/comment/comment.service';
import { MockCategoryService } from '../../shared/category/mock-category.service';
import { UserService } from '../../shared/user/user.service';
import { MockUserService } from '../../shared/user/mock-user.service';
import { CategoryService } from '../../shared/category/category.service';
import { ArticleService } from '../../shared/article/shared/article.service';
import { MockArticleService } from '../../shared/article/shared/mock-article.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [ HomeComponent ],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: ProductService, useClass: MockProductService},
        {provide: OfferService, useClass: MockOfferService},
        {provide: ArticleService, useClass: MockArticleService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: CommentService, useClass: MockCommentService},
        {provide: UserService, useClass: MockUserService},
        DeviceService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});