import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortComponent } from './sort.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SortContainerComponent } from './sort-container/sort-container.component';
import { SortItemComponent } from './sort-item/sort-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

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
