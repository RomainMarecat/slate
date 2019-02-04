import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreparationRoutingModule } from './preparation-routing.module';
import { PreparationListComponent } from './preparation-list/preparation-list.component';
import { PreparationDetailComponent } from './preparation-detail/preparation-detail.component';

@NgModule({
  imports: [
    CommonModule,
    PreparationRoutingModule
  ],
  declarations: [PreparationListComponent, PreparationDetailComponent]
})
export class PreparationModule { }
