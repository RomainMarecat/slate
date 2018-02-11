import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortComponent } from './sort.component';
import { MatListModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SortContainerComponent } from './sort-container/sort-container.component';
import { SortItemComponent } from './sort-item/sort-item.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  declarations: [
    SortComponent,
    SortContainerComponent,
    SortItemComponent
  ],
  exports: [
    SortComponent,
    SortContainerComponent,
    SortItemComponent
  ]
})
export class SortModule {}
