import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseListComponent } from './base-list/base-list.component';
import { BaseEditComponent } from './base-edit/base-edit.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    NgxDatatableModule,
    RouterModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    BaseListComponent,
    BaseEditComponent
  ]
})
export class BaseModule {
}
