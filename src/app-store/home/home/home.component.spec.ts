import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CategoryModule } from '../category/category.module';
import { HeaderModule } from '../header/header.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../../../shared/router/mock-localize-router.service';
import { configureTestSuite } from '../../../shared/unit-test/configure-test-suite';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuModule } from '../../../shared/menu/menu.module';
import { CategoryService } from '../../../shared/category/category.service';
import { MockCategoryService } from '../../../shared/category/mock-category.service';
import { MediaService } from '../../../shared/media/media.service';
import { MockMediaService } from '../../../shared/media/mock-media.service';
import { StorageModule } from '../../../shared/media/storage/storage.module';
import { AngularFireStorage } from '@angular/fire/storage';
import { MockAngularFireStorage } from '../../../shared/media/shared/mock-angular-fire-storage';
import { ProductService } from '../../../shared/product/shared/product.service';
import { MockProductService } from '../../../shared/product/shared/mock-product.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { UserService } from '../../../shared/user/shared/user.service';
import { MockUserService } from '../../../shared/user/shared/mock-user.service';
import { FavoriteService } from '../../../shared/favorite/shared/favorite.service';
import { MockFavoriteService } from '../../../shared/favorite/shared/mock-favorite.service';
import { MockCartService } from '../../../shared/cart/shared/mock-cart.service';
import { CartService } from '../../../shared/cart/shared/cart.service';
import { SeoService } from '../../../shared/seo/shared/seo.service';
import { MenuService } from '../../../shared/menu/menu.service';
import { CategoryFavoriteModule } from '../category-favorite/category-favorite.module';
import { ProductModule } from '../product/product.module';
import { MatDialogModule } from '@angular/material';
import { mockHomeProductNewer } from '../../../shared/product/shared/mock-product';
import { of, throwError } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productService: ProductService;
  let userService: UserService;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
      ],
      imports: [
        CategoryModule,
        CategoryFavoriteModule,
        HeaderModule,
        MatDialogModule,
        MenuModule,
        ProductModule,
        RouterTestingModule,
        StorageModule,
        LocalizeRouterModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
      ],
      providers: [
        SeoService,
        MenuService,
        {provide: AlertService, useClass: MockAlertService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: CategoryService, useClass: MockCategoryService},
        {provide: UserService, useClass: MockUserService},
        {provide: FavoriteService, useClass: MockFavoriteService},
        {provide: MediaService, useClass: MockMediaService},
        {provide: ProductService, useClass: MockProductService},
        {provide: CartService, useClass: MockCartService},
        {provide: AngularFireStorage, useClass: MockAngularFireStorage}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    productService = TestBed.get(ProductService);
    userService = TestBed.get(UserService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set products', () => {
    expect(component.productOptions.product_new.products.length).toEqual(3);
  });

  it('should set layout and switch to list', () => {

    expect(component.productOptions.product_new.layout).toEqual('card');
    component.productOptions.product_new.layout = 'list';
    expect(component.productOptions.product_new.layout).toEqual('list');
  });

  it('should subscribe and result on getProducts', fakeAsync(() => {
    spyOn(component, 'getNewProducts').and.returnValue(of(null));
    spyOn(component, 'getRecentPublishedProducts').and.returnValue(of(null));
    spyOn(component, 'getBestProducts').and.returnValue(of(null));
    spyOn(component, 'getProductsMostViewed').and.returnValue(of(null));
    spyOn(component, 'getProductsMostCommented').and.returnValue(of(null));

    component.ngOnInit();

    fixture.detectChanges();
    tick();

    expect(component.getNewProducts).toHaveBeenCalledTimes(1);
    expect(component.getRecentPublishedProducts).toHaveBeenCalledTimes(1);
    expect(component.getBestProducts).toHaveBeenCalledTimes(1);
    expect(component.getProductsMostViewed).toHaveBeenCalledTimes(1);
    expect(component.getProductsMostCommented).toHaveBeenCalledTimes(1);
  }));

  it('should subscribe on getProducts', fakeAsync(() => {
    spyOn(productService, 'getProducts').and.returnValue(of(mockHomeProductNewer));

    component.ngOnInit();

    fixture.detectChanges();
    tick();

    expect(component.productOptions.product_new.products).toEqual(mockHomeProductNewer);
    expect(productService.getProducts).toHaveBeenCalledTimes(6);
  }));

  it('should subscribe and throw error', fakeAsync(() => {
    spyOn(productService, 'getProducts').and.returnValue(throwError({error: 'error'}));
    component.ngOnInit();

    tick();
    fixture.detectChanges();

    expect(productService.getProducts).toHaveBeenCalledTimes(1);
    expect(component.productOptions.product_new.products).toEqual([]);
  }));

  it('should subscribe and throw error on getBestProducts', fakeAsync(() => {
    spyOn(productService, 'getProducts').and.returnValue(throwError({error: 'error'}));

    component.getBestProducts().subscribe(() => {
    }, () => {
    });

    fixture.detectChanges();
    tick();

    expect(component.productOptions.product_best.products).toEqual([]);
    expect(productService.getProducts).toHaveBeenCalledTimes(1);
  }));

  it('should subscribe and throw error on getProductsMostViewed', fakeAsync(() => {
    spyOn(productService, 'getProducts').and.returnValue(throwError({error: 'error'}));

    component.getProductsMostViewed().subscribe(() => {
    }, () => {
    });

    fixture.detectChanges();
    tick();

    expect(component.productOptions.product_most_viewed.products).toEqual([]);
    expect(productService.getProducts).toHaveBeenCalledTimes(1);
  }));

  it('should subscribe and throw error on getRecentPublishedProducts', fakeAsync(() => {
    spyOn(productService, 'getProducts').and.returnValue(throwError({error: 'error'}));

    component.getRecentPublishedProducts().subscribe(() => {
    }, () => {
    });

    fixture.detectChanges();
    tick();

    expect(component.productOptions.product_recent_month.products).toEqual([]);
    expect(productService.getProducts).toHaveBeenCalledTimes(1);
  }));

  it('should subscribe and throw error on getProductsMostCommented', fakeAsync(() => {
    spyOn(productService, 'getProducts').and.returnValue(throwError({error: 'error'}));

    component.getProductsMostCommented().subscribe(() => {
    }, () => {
    });

    fixture.detectChanges();
    tick();

    expect(component.productOptions.product_most_commented.products).toEqual([]);
    expect(productService.getProducts).toHaveBeenCalledTimes(1);
  }));

  it('should subscribe and throw error on getNewProducts', fakeAsync(() => {
    spyOn(productService, 'getProducts').and.returnValue(throwError({error: 'error'}));

    component.getNewProducts().subscribe(() => {
    }, () => {
    });

    fixture.detectChanges();
    tick();

    expect(component.productOptions.product_new.products).toEqual([]);
    expect(productService.getProducts).toHaveBeenCalledTimes(1);
  }));

  it('should subscribe on isAuthenticated', fakeAsync(() => {
    spyOn(userService, 'isAuthenticated').and.returnValue(of(true));

    component.isAuhenticated();

    fixture.detectChanges();
    tick();

    expect(userService.isAuthenticated).toHaveBeenCalledTimes(1);
    expect(component.productOptions.authenticated).toEqual(true);
  }));

  it('should subscribe on isAuthenticated and throw an error', fakeAsync(() => {
    spyOn(userService, 'isAuthenticated').and.returnValue(throwError({error: 'error'}));

    component.isAuhenticated();

    fixture.detectChanges();
    tick();

    expect(userService.isAuthenticated).toHaveBeenCalledTimes(1);
    expect(component.productOptions.authenticated).toEqual(false);

  }));
});
