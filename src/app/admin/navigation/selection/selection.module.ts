import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';

import { SelectionRoutingModule } from './selection-routing.module';
import { SelectionComponent } from './selection.component';
import { SelectionListComponent } from './selection-list/selection-list.component';

@NgModule({
  imports: [
    CommonModule,
    NgxEditorModule,
    SelectionRoutingModule
  ],
  declarations: [SelectionComponent, SelectionListComponent]
})
export class SelectionModule {}
