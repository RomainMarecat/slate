import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { LocalizeRouterModule } from 'localize-router';
import { SearchModule } from '../search/search.module';
import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    Angulartics2Module,
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    SearchModule,
    TranslateModule.forChild(),
    RouterModule,
    LocalizeRouterModule
  ],
  declarations: [
    MenuComponent
  ],
  exports: [
    MenuComponent
  ],
  providers: [
    MenuService
  ]
})
export class MenuModule {
}
