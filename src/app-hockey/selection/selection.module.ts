import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { SelectionItemComponent } from './selection-item/selection-item.component';
import { SelectionSliderComponent } from './selection-slider/selection-slider.component';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { environment } from '../../environments/environment.hockey';
import { SharedModule } from '../../shared/shared.module';
import { CloudinaryModule } from '../../shared/media/cloudinary/cloudinary.module';
import { TranslateModule } from '@ngx-translate/core';

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
