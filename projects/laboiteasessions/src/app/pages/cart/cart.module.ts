import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatIconModule, MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartListService } from './shared/cart-list.service';
import { CartService } from './shared/cart.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    CartRoutingModule,
  ],
  declarations: [
    CartComponent,
    CartDialogComponent
  ],
  entryComponents: [
    CartDialogComponent
  ],
  exports: [CartComponent],
})
export class CartModule {
}
