import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseListComponent } from './base-list/base-list.component';
import { BaseEditComponent } from './base-edit/base-edit.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BaseListComponent,
    BaseEditComponent
  ]
})
export class BaseModule {
}
