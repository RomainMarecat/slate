import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSidenavModule } from '@angular/material';
import { MenuModule } from '../menu/menu.module';
import { TranslateModule } from '@ngx-translate/core';
import { FooterModule } from '../footer/footer.module';
import { RouterModule } from '@angular/router';
import { LoaderModule } from '../loader/loader.module';
import { FacetModule } from '../facet/facet.module';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { LocalizeRouterModule } from 'localize-router';

@NgModule({
  imports: [
    CommonModule,
    BreadcrumbModule,
    FacetModule,
    FooterModule,
    LoaderModule,
    LocalizeRouterModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MenuModule,
    RouterModule,
    TranslateModule,
  ],
  declarations: [
    SidenavComponent,
  ],
  exports: [
    SidenavComponent,
  ]
})
export class SidenavModule {
}
