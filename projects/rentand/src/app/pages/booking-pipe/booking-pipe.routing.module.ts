import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { PublicGuard } from '../../shared/guard/public.guard';
import { UserGuard } from '../../shared/guard/user.guard';
import { BookingConfirmComponent } from './booking-confirm/booking-confirm.component';
import { BookingPipeComponent } from './booking-pipe.component';

const bookingPipeRoutes: Routes = [
  {
    path: 'booking',
    component: BookingPipeComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        override: true,
        title: 'Choisissez et réservez votre professionnel du sport - rentand',
        description: 'rentand, le site qui vous permet de choisir et '
          + 'réserver votre moniteur de ski, coach sportif, professionnel du sport, tout simplement !'
      }
    },
  },
  {
    path: 'booking/:id',
    component: BookingPipeComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        override: true,
        title: 'Choisissez et réservez votre professionnel du sport - rentand',
        description: 'rentand, le site qui vous permet de choisir et '
          + 'réserver votre moniteur de ski, coach sportif, professionnel du sport, tout simplement !'
      }
    },
  },
  {
    path: 'booking/confirm/:id',
    component: BookingConfirmComponent,
    canActivate: [MetaGuard, UserGuard],
    data: {
      meta: {
        override: true,
        title: 'Choisissez et réservez votre professionnel du sport - rentand',
        description: 'rentand, le site qui vous permet de choisir et '
          + 'réserver votre moniteur de ski, coach sportif, professionnel du sport, tout simplement !'
      }
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(bookingPipeRoutes),
  ],
  exports: [RouterModule],
})
export class BookingPipeRoutingModule {
}
