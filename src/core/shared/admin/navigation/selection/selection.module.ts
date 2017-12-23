import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';

import { SelectionRoutingModule } from './selection-routing.module';
import { SelectionComponent } from './selection.component';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { SelectionAddComponent } from './selection-add/selection-add.component';
import { SharedModule } from '../../../shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SelectionService } from '../../shared/navigation/selection/selection.service';

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
    SelectionComponent,
    SelectionListComponent,
    SelectionAddComponent
  ],
  providers: [
    SelectionService
  ]
})
export class SelectionModule {}