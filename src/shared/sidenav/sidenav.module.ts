import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavService } from './sidenav.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MenuModule } from '../menu/menu.module';
import { TranslateModule } from '@ngx-translate/core';
import { FooterModule } from '../footer/footer.module';
import { RouterModule } from '@angular/router';
import { LoaderModule } from '../loader/loader.module';
import { FacetModule } from '../facet/facet.module';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { LocalizeRouterModule } from 'localize-router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatSnackBarModule,
    MatBottomSheetModule,
    MenuModule,
    RouterModule,
    TranslateModule,
  ],
  declarations: [
    SidenavComponent,
  ],
  exports: [
    SidenavComponent,
  ],
  providers: [
    SidenavService
  ]
})
export class SidenavModule {
}
