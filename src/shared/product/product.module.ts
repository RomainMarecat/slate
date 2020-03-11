import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Angulartics2Module } from 'angulartics2';
import { NgStringPipesModule } from 'ngx-pipes';
import { LoaderModule } from '../loader/loader.module';
import { MediaModule } from '../media/media.module';
import { ProductRoutingModule } from './product-routing.module';
import { SharedProductModule } from './shared-product.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    Angulartics2Module,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    LoaderModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule,
    MediaModule,
    NgStringPipesModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    SharedProductModule,
    ProductRoutingModule
  ]
})
export class SharedProductWithRoutesModule {
}
