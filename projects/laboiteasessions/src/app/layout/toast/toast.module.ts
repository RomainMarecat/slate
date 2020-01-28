import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastService } from '../../shared/services/toast.service';
import { ToastComponent } from './toast.component';


@NgModule({
  declarations: [
    ToastComponent
  ],
  exports: [
    ToastComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ToastService
  ]
})
export class ToastModule {
}
