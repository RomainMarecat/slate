import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from '../guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [ AdminGuard ],
    component: HomeComponent
  },
  {
    canActivate: [ AdminGuard ],
    path: 'article',
    loadChildren: './article/article.module#ArticleModule'
  },
  {
    canActivate: [ AdminGuard ],
    path: 'contact',
    loadChildren: './contact/contact.module#ContactModule'
  },
  {
    canActivate: [ AdminGuard ],
    path: 'attribute',
    loadChildren: './attribute/attribute.module#AttributeModule'
  },
  {
    canActivate: [ AdminGuard ],
    path: 'navigation',
    loadChildren: './navigation/navigation.module#NavigationModule'
  },
  {
    canActivate: [ AdminGuard ],
    path: 'cms',
    loadChildren: './cms/cms.module#CmsModule'
  },
  {
    canActivate: [ AdminGuard ],
    path: 'offer',
    loadChildren: './offer/offer.module#OfferModule'
  },
  {
    canActivate: [ AdminGuard ],
    path: 'map',
    loadChildren: './map/map.module#MapModule'
  },
  {
    canActivate: [ AdminGuard ],
    path: 'partner',
    loadChildren: './partner/partner.module#PartnerModule'
  },
  {
    canActivate: [ AdminGuard ],
    path: 'product',
    loadChildren: './product/product.module#ProductModule'
  },
  {
    canActivate: [ AdminGuard ],
    path: 'material',
    loadChildren: './../material/material.module#MaterialModule'
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {
}
