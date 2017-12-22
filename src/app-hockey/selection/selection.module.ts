import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { SelectionItemComponent } from './selection-item/selection-item.component';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { environment } from '../../environments/environment.hockey';
import { NgStringPipesModule } from 'angular-pipes';
import { SharedModule } from '../../core/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    NgStringPipesModule,
    RouterModule,
    SharedModule,
    TranslateModule,
  ],
  declarations: [SelectionListComponent, SelectionItemComponent]
})
export class SelectionModule {}
