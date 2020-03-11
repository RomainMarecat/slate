import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from '../guard/admin.guard';
import { LocalizeRouterModule } from 'localize-router';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: AdminComponent,
    children: [
      {
        canActivate: [AdminGuard],
        path: '',
        component: HomeComponent
      },
      {
        canActivate: [AdminGuard],
        path: 'article',
        loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
      },
      {
        canActivate: [AdminGuard],
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
      },
      {
        canActivate: [AdminGuard],
        path: 'attribute',
        loadChildren: () => import('./attribute/attribute.module').then(m => m.AttributeModule)
      },
      {
        canActivate: [AdminGuard],
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
      },
      {
        canActivate: [AdminGuard],
        path: 'selection',
        loadChildren: () => import('./selection/selection.module').then(m => m.SelectionModule)
      },
      {
        canActivate: [AdminGuard],
        path: 'cms',
        loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
      },
      {
        canActivate: [AdminGuard],
        path: 'offer',
        loadChildren: () => import('./offer/offer.module').then(m => m.OfferModule)
      },
      {
        canActivate: [AdminGuard],
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
      },
      {
        canActivate: [AdminGuard],
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
      },
      {
        canActivate: [AdminGuard],
        path: 'map',
        loadChildren: () => import('./map/map.module').then(m => m.MapModule)
      },
      {
        canActivate: [AdminGuard],
        path: 'partner',
        loadChildren: () => import('./partner/partner.module').then(m => m.PartnerModule)
      },
      {
        canActivate: [AdminGuard],
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
      },
      {
        canActivate: [AdminGuard],
        path: 'app-recipe',
        loadChildren: () => import('./app-recipe/app-recipe.module').then(m => m.AppRecipeModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    LocalizeRouterModule
  ]
})
export class AdminRoutingModule {
}
