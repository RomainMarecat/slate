import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductEditRoutingModule } from './product-edit-routing.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { NgArrayPipesModule, RangePipe } from 'ngx-pipes';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment.menincar';

@NgModule({
  imports: [
    CommonModule,
    NgArrayPipesModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapApiKey
    }),
    ProductEditRoutingModule
  ],
  declarations: [ProductEditComponent],
  providers: [RangePipe]
})
export class CarProductEditModule { }
