import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../../shared.module';
import { AttributeService } from '../../attribute/attribute.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { AttributeRoutingModule } from './attribute-routing.module';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { AttributeEditComponent } from './attribute-edit/attribute-edit.component';
import { AttributeComponent } from './attribute/attribute.component';
import { LocalizeRouterModule } from 'localize-router';

const TABLE_ATTRIBUTE = new InjectionToken<string>('attribute');

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    SharedModule,

    LocalizeRouterModule,
    AttributeRoutingModule
  ],
  declarations: [
    AttributeEditComponent,
    AttributeListComponent,
    AttributeComponent
  ],
  providers: [
    {provide: TABLE_ATTRIBUTE, useValue: 'attribute'},
    {
      provide: AttributeService,
      useClass: AttributeService,
      deps: [AngularFirestore, TABLE_ATTRIBUTE]
    },
  ]
})
export class AttributeModule {
}
