import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NotFoundComponent } from './not-found.component';



@NgModule({
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class NotFoundModule { }
