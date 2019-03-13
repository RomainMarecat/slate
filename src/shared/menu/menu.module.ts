import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MatButtonModule, MatDialogModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalizeRouterModule } from 'localize-router';
import { SearchModule } from '../search/search.module';

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
  ]
})
export class MenuModule {
}
