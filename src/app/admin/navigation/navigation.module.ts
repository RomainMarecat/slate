import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';

import { NavigationRoutingModule } from './navigation-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NgxEditorModule,
    NavigationRoutingModule
  ],
  declarations: []
})
export class NavigationModule {}
