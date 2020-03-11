import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { LoaderService } from './loader.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent
  ],
  providers: [
    LoaderService
  ]
})
export class LoaderModule {
}
