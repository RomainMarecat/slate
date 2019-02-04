import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SeoModule } from '../../shared/seo/seo.module';
import { RecipeSharedListModule } from '../recipe-list/recipe-list/recipe-shared-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    SeoModule,
    RecipeSharedListModule,
    HomeRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [HomeComponent],
  providers: []
})
export class HomeModule {
}
