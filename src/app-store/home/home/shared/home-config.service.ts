import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ProductOption } from '../../../../shared/product/shared/product-option';
import { Slider } from '../../header/header/shared/slider';
import { CategoryOption } from './category-option';

@Injectable({
  providedIn: 'root'
})
export class HomeConfigService {

  getCategoryOptions(): CategoryOption {
    return {
      display_title: true,
      display_subtitle: true,
      image_link: true,
      text_link: true,
      display_icon: true,
      display_image: true,
    };
  }

  getSliderOption(): {sliders: Slider[]} {
    return {
      sliders: [
        {
          title: 'magazines',
          image: '/assets/images/bg-1.jpg',

        }, {
          title: 'shopping',
          image: '/assets/images/bg-2.jpg'
        }
      ]
    };
  }

  getProductOption(): ProductOption {
    return {
      authenticated: false,
      cart: null,
      product_most_ordered: {
        favorite: {
          display_icon: true,
        },
        layout: 'card',
        limit: 6,
        display_title: true,
        products: [],
        order_by: {column: 'ordered', direction: 'desc'},
        title: 'product-most-ordered.header.title'
      },
      product_most_ordered_this_month: {
        favorite: {
          display_icon: true,
        },
        layout: 'list',
        limit: 6,
        display_title: true,
        products: [],
        order_by: {column: `ordered_by_month.${moment().format('YYYY-MM')}`, direction: 'desc'},
        title: 'product-most-ordered-this-month.header.title'
      },
      product_new: {
        favorite: {
          display_icon: true,
        },
        layout: 'card',
        limit: 3,
        display_title: true,
        products: [],
        title: 'product-new.header.title'
      },
      product_recent_month: {
        favorite: {
          display_icon: true,
        },
        layout: 'list',
        limit: 6,
        display_title: true,
        threshold: moment().subtract(1, 'months'),
        products: [],
        title: 'product-recent-month.header.title'
      },
      product_best: {
        favorite: {
          display_icon: true,
        },
        layout: 'card',
        limit: 3,
        display_title: true,
        products: [],
        threshold: 4,
        title: 'product-best.header.title'
      },
      product_most_viewed: {
        favorite: {
          display_icon: true,
        },
        layout: 'card',
        limit: 10,
        display_title: true,
        products: [],
        threshold: 10,
        title: 'product-most-viewed.header.title'
      },
      product_most_commented: {
        favorite: {
          display_icon: true,
        },
        layout: 'card',
        limit: 3,
        display_title: true,
        products: [],
        threshold: 10,
        title: 'product-most-commented.header.title'
      },
      user: null,
    };
  }
}
