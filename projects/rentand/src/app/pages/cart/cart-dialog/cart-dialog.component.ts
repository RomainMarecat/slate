import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment_ from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mono } from '../../../shared/interfaces/mono';
import { AppState } from '../../../shared/store/app.state';
import { BookingPipeService } from '../../booking-pipe/booking-pipe.service';
import * as action from '../cart-list/action/cart-list.action';
import { MonoCart } from '../shared/cart';
import { CartItem } from '../shared/cart-item';
import { selectMonosCart } from '../shared/cart.selector';

const moment = moment_;

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDialogComponent implements OnInit {
  monoCarts: Observable<Array<MonoCart>> | Observable<any>;
  arrayMonoCarts: Array<MonoCart>;
  monoCart: MonoCart;
  locale: string;

  constructor(private dialogRef: MatDialogRef<CartDialogComponent>,
              private translateService: TranslateService,
              private bookingPipeService: BookingPipeService,
              private store: Store<AppState>,
              private router: Router) {
  }

  ngOnInit() {
    this.locale = this.translateService.getBrowserLang();
    moment.locale(this.locale);
    this.monoCarts = this.store.select(selectMonosCart)
      .pipe(
        map((cart: any) => {
          this.arrayMonoCarts = cart;
          if (cart && cart.length > 0) {
            this.monoCart = cart[0];
          } else {
            this.monoCart = undefined;
          }
          return cart;
        })
      );
  }

  close() {
    this.dialogRef.close();
  }

  deleteCartItem(mono: Mono, cartItem: CartItem) {
    this.store.dispatch(new action.DeleteCartItemAction(mono, cartItem));
  }

  selectedMonoChanged(index: number) {
    if (this.arrayMonoCarts && this.arrayMonoCarts.length > 0 && this.arrayMonoCarts[index]) {
      this.monoCart = this.arrayMonoCarts[index];
    } else {
      this.monoCart = undefined;
    }
  }

  /*********************************
   ********* Display functions ******
   **********************************/
  monoCartTitle(cartMono: MonoCart): string {
    if (cartMono && cartMono.mono && cartMono.mono.user_metadata
      && cartMono.mono.user_metadata.firstname && cartMono.mono.user_metadata.lastname) {
      return cartMono.mono.user_metadata.firstname + ' ' + cartMono.mono.user_metadata.lastname;
    }
    return 'mono';
  }

  monoCartFirstName(cartMono: MonoCart): string {
    if (cartMono && cartMono.mono && cartMono.mono.user_metadata
      && cartMono.mono.user_metadata.firstname) {
      return cartMono.mono.user_metadata.firstname;
    }
    return '';
  }

  sessionDurationDisplay(cartItem: CartItem): string {
    if (cartItem && cartItem.session
      && cartItem.session.start_date && cartItem.session.start_time
      && cartItem.session.end_date && cartItem.session.end_time) {
      const mmtStart = moment(cartItem.session.start_date + cartItem.session.start_time, 'YYYY-MM-DDHH:mm');
      const mmtEnd = moment(cartItem.session.end_date + cartItem.session.end_time, 'YYYY-MM-DDHH:mm');
      const duration = mmtEnd.diff(mmtStart, 'minutes');
      return moment.duration(duration, 'minutes').humanize();
    }
    return '';
  }

  sessionStartDisplay(cartItem: CartItem): string {
    if (cartItem && cartItem.session
      && cartItem.session.start_date && cartItem.session.start_time
      && cartItem.session.end_date && cartItem.session.end_time) {
      const mmtStart = moment(cartItem.session.start_date + cartItem.session.start_time, 'YYYY-MM-DDHH:mm');
      return mmtStart.format('ddd DD MMM YYYY');
    }
    return '';
  }

  sessionSport(cartItem: CartItem): string {
    return cartItem && cartItem.session
    && cartItem.session.details
    && cartItem.session.details.sport
    && cartItem.session.details.sport.trans
    && cartItem.session.details.sport.trans[this.locale] ?
      cartItem.session.details.sport.trans[this.locale] : '';
  }

  sessionCity(cartItem: CartItem): string {
    return cartItem && cartItem.session
    && cartItem.session.details
    && cartItem.session.details.city
    && cartItem.session.details.city.name ?
      cartItem.session.details.city.name : '';
  }

  sessionCityWithMeetingPoint(cartItem: CartItem): string {
    let city = '';
    const session = cartItem.session;
    if (session
      && session.details
      && session.details.city
      && session.details.city.name) {
      city = session.details.city.name;
      if (session.details.meeting_point && session.details.meeting_point.title) {
        city += ' - ' + session.details.meeting_point.title;
      }
    }
    return city;
  }

  totalPriceForMono(cartMono: MonoCart): string {
    let price = 0;
    for (const i in cartMono.cart_items) {
      if (!cartMono.cart_items[i].session
        || !cartMono.cart_items[i].session.details
        || !cartMono.cart_items[i].session.details.price) {
        continue;
      }
      price += cartMono.cart_items[i].session.details.price;
    }
    return price.toFixed(2).toString();
  }

  navigateToBooking(monoCart: MonoCart) {
    this.router.navigate(['/booking', monoCart.mono.user_id]);
    window.scrollTo(0, 0); // scrolling up to the page, yseful because called by popup

  }
}
