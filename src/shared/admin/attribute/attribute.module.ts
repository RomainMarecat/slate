import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxEditorModule } from 'ngx-editor';
import { SharedModule } from '../../shared.module';
import { AttributeService } from '../../attribute/attribute.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { AttributeRoutingModule } from './attribute-routing.module';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { AttributeEditComponent } from './attribute-edit/attribute-edit.component';

const TABLE_ATTRIBUTE = new InjectionToken < string > ('attribute');

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    SharedModule,
    NgxEditorModule,
    AttributeRoutingModule
  ],
  declarations: [
    AttributeEditComponent,
    AttributeListComponent
  ],
  providers: [
    { provide: TABLE_ATTRIBUTE, useValue: 'attribute' },
    {
      provide: AttributeService,
      useClass: AttributeService,
      deps: [AngularFirestore, TABLE_ATTRIBUTE]
    },
  ]
})
export class AttributeModule {}
