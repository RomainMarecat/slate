import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MaterialFactoryModule } from '../../../shared/components/material/material-factory.module';
import { CartComponent } from './cart.component';


@NgModule({
  declarations: [CartComponent],
  exports: [CartComponent],
  imports: [
    CommonModule,
    MaterialFactoryModule,
    MatIconModule
  ]
})
export class CartModule {
}
