import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributeRoutingModule } from './attribute-routing.module';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { AttributeEditComponent } from './attribute-edit/attribute-edit.component';

@NgModule({
  imports: [
    CommonModule,
    AttributeRoutingModule
  ],
  declarations: [
    AttributeEditComponent,
    AttributeListComponent
  ]
})
export class AttributeModule {}
