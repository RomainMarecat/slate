import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { Angulartics2Module } from 'angulartics2';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    Angulartics2Module,
    CommonModule,
    MatIconModule,
  ],
  entryComponents: [
    AlertComponent
  ],
  declarations: [AlertComponent],
  exports: [AlertComponent]
})
export class AlertModule {}
