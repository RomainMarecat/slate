import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';

import { SelectionRoutingModule } from './selection-routing.module';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { SharedModule } from '../../../shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectionEditComponent } from './selection-edit/selection-edit.component';
import { ProductService } from '../../shared/product/product.service';
import { SelectionService } from '../../../selection/selection.service';
import { AngularFirestore } from 'angularfire2/firestore';

const TABLE_SELECTION = new InjectionToken<string>('selection');

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
    ,
    {provide: TABLE_SELECTION, useValue: 'selection'},
    {
      provide: SelectionService,
      useClass: SelectionService,
      deps: [AngularFirestore, TABLE_SELECTION]
    },
    ProductService
  ]
})
export class SelectionModule {
}
