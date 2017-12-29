import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from './footer.component';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';
import {Angulartics2Module} from 'angulartics2';

@NgModule({
  imports: [
    Angulartics2Module,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [FooterComponent],
  exports: [FooterComponent]
})
export class FooterModule { }
