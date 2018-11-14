import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from '../guard/admin.guard';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
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
        loadChildren: './article/article.module#ArticleModule'
      },
      {
        canActivate: [AdminGuard],
        path: 'contact',
        loadChildren: './contact/contact.module#ContactModule'
      },
      {
        canActivate: [AdminGuard],
        path: 'attribute',
        loadChildren: './attribute/attribute.module#AttributeModule'
      },
      {
        canActivate: [AdminGuard],
        path: 'category',
        loadChildren: './category/category.module#CategoryModule'
      },
      {
        canActivate: [AdminGuard],
        path: 'selection',
        loadChildren: './selection/selection.module#SelectionModule'
      },
      {
        canActivate: [AdminGuard],
        path: 'cms',
        loadChildren: './cms/cms.module#CmsModule'
      },
      {
        canActivate: [AdminGuard],
        path: 'offer',
        loadChildren: './offer/offer.module#OfferModule'
      },
      {
        canActivate: [AdminGuard],
        path: 'order',
        loadChildren: './order/order.module#OrderModule'
      },
      {
        canActivate: [AdminGuard],
        path: 'map',
        loadChildren: './map/map.module#MapModule'
      },
      {
        canActivate: [AdminGuard],
        path: 'partner',
        loadChildren: './partner/partner.module#PartnerModule'
      },
      {
        canActivate: [AdminGuard],
        path: 'product',
        loadChildren: './product/product.module#ProductModule'
      },
      {
        canActivate: [AdminGuard],
        path: 'app-recipe',
        loadChildren: './app-recipe/app-recipe.module#AppRecipeModule'
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
