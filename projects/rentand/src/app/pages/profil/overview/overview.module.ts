import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgStringPipesModule } from 'ngx-pipes';
import { SelectSportTeachedModule } from '../../../shared/components/select-sport-teached/select-sport-teached.module';
import { OverviewComponent } from './overview.component';



@NgModule({
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
  imports: [
    CommonModule,
    MatCardModule,
    NgStringPipesModule,
    SelectSportTeachedModule,
    MatIconModule
  ]
})
export class OverviewModule { }
