import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingAddComponent } from './booking-add/booking-add.component';

const routes: Routes = [
  {
    path: 'booking',
    component: BookingAddComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
