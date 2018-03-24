import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { Angulartics2Module } from 'angulartics2';

@NgModule({
  imports: [
    Angulartics2Module,
    CommonModule,
    MatProgressBarModule
  ],
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule {}
