import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { SelectionItemComponent } from './selection-item/selection-item.component';
import { SelectionSliderComponent } from './selection-slider/selection-slider.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CloudinaryModule } from '../../shared/media/cloudinary/cloudinary.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    CloudinaryModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    SharedModule,
    TranslateModule,
  ],
  declarations: [
    SelectionListComponent,
    SelectionItemComponent,
    SelectionSliderComponent
  ]
})
export class SelectionModule {}
