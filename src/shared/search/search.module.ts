import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalizeRouterModule } from 'localize-router';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    RouterModule,
    SearchRoutingModule,
    TranslateModule.forChild()
  ],
  entryComponents: [
    SearchDialogComponent
  ],
  declarations: [
    SearchDialogComponent
  ],
  exports: [
    SearchDialogComponent
  ]
})
export class SearchModule {
}
