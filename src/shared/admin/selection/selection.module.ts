import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SelectionRoutingModule } from './selection-routing.module';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { SharedModule } from '../../shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectionEditComponent } from './selection-edit/selection-edit.component';
import { SelectionService } from '../../selection/selection.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductService } from '../../product/shared/product.service';
import { SelectionComponent } from './selection/selection.component';

export const TABLE_SELECTION = new InjectionToken<string>('selection');
export const TABLE_PRODUCT = new InjectionToken<string>('product');

@NgModule({
  imports: [
    CommonModule,

    SharedModule,
    NgxDatatableModule,
    TranslateModule,
    SelectionRoutingModule
  ],
  declarations: [
    SelectionListComponent,
    SelectionEditComponent,
    SelectionComponent,
  ],
  providers: [
    {provide: TABLE_SELECTION, useValue: 'selection'},
    {provide: TABLE_PRODUCT, useValue: 'product'},
    {
      provide: SelectionService,
      useClass: SelectionService,
      deps: [AngularFirestore, TABLE_SELECTION]
    },
    {
      provide: ProductService,
      useClass: ProductService,
      deps: [AngularFirestore, TABLE_PRODUCT]
    },
  ]
})
export class SelectionModule {
}
