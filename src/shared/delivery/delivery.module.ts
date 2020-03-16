import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { DeliveryItemComponent } from './delivery-item/delivery-item.component';
import { LoaderModule } from '../loader/loader.module';
import { NgPipesModule } from 'ngx-pipes';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DeliveryComponent, DeliveryListComponent, DeliveryItemComponent],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    LoaderModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    NgPipesModule,
    FlexLayoutModule,
    MatIconModule,
    TranslateModule.forChild()
  ]
})
export class DeliveryModule {
}
