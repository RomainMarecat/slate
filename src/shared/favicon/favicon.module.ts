import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Favicon } from './favicon.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [Favicon]
})
export class FaviconModule { }
