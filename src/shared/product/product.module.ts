import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Angulartics2Module } from 'angulartics2';
import { NgStringPipesModule } from 'ngx-pipes';
import { LoaderModule } from '../loader/loader.module';
import { MediaModule } from '../media/media.module';
import { ProductRoutingModule } from './product-routing.module';
import { SharedProductModule } from './shared-product.module';

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
