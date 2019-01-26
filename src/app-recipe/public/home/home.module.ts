import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SeoModule } from '../../../shared/seo/seo.module';
import { RecipeModule } from '../recipe/recipe.module';
import { FooterModule } from '../../../shared/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RecipeModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    SeoModule,
    HomeRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [HomeComponent]
})
export class HomeModule {
}
