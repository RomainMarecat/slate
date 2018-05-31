import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';

import { SelectionRoutingModule } from './selection-routing.module';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { SharedModule } from '../../../shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectionService } from '../../shared/navigation/selection/selection.service';
import { SelectionEditComponent } from './selection-edit/selection-edit.component';
import { ProductService } from '../../shared/product/product.service';

@NgModule({
  imports: [
    CommonModule,
    NgxEditorModule,
    SharedModule,
    NgxDatatableModule,
    TranslateModule,
    SelectionRoutingModule
  ],
  declarations: [
    SelectionListComponent,
    SelectionEditComponent,
  ],
  providers: [
    SelectionService,
    ProductService
  ]
})
export class SelectionModule {}
