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

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    LoaderModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MenuModule,
    RouterModule,
    TranslateModule,
    FacetModule,
  ],
  declarations: [
    SidenavComponent,
  ],
  exports: [
    SidenavComponent,
  ]
})
export class SidenavModule {}
