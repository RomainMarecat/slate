import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CityTeached } from '../../shared/interfaces/city-teached';
import { Mono } from '../../shared/interfaces/mono';
import { SportTeached } from '../../shared/interfaces/sport-teached';
import { MonoService } from '../../shared/services/mono.service';
import { ProfilService } from '../../shared/services/profil.service';
import { ToastService } from '../../shared/services/toast.service';
import { Cart } from '../cart/shared/cart';
import { CartService } from '../cart/shared/cart.service';
import { AgendaComponent } from '../../shared/components/agenda/agenda.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  mono: Mono;
  cart: Cart;
  sportTeached: SportTeached;
  cityTeached: CityTeached;
  subscribeSportTeached: Subscription;
  subscribeCityTeached: Subscription;
  isMonoCartEmpty: boolean;

  @ViewChild(AgendaComponent, {static: true}) agendaComponent: AgendaComponent;

  constructor(private monoService: MonoService,
              private route: ActivatedRoute,
              private toastService: ToastService,
              private translateService: TranslateService,
              private cartService: CartService,
              private changeDetectorRef: ChangeDetectorRef,
              private profilService: ProfilService) {
  }

  ngOnInit() {
    this.getCoach();
    this.cartService.cart$
      .subscribe(cart => {
        this.cart = cart.cart;
        this.checkCart();
      });

    this.subscribeSportTeached = this.profilService.sportTeachedAnnounced$
      .subscribe((sportTeached: SportTeached) => {
        this.sportTeached = sportTeached;
      });
    this.subscribeCityTeached = this.profilService.cityTeachedAnnounced$
      .subscribe((cityTeached: CityTeached) => {
        this.cityTeached = cityTeached;
      });
  }

  getCoach() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (!!paramMap.has('slug')) {
        const slug = paramMap.get('slug');
        this.monoService.getMonoBySlug(slug)
          .subscribe((mono: Mono) => {
            this.mono = mono;
            this.checkCart();
          });
      }
    });
  }

  openCart() {
    this.cartService.emitOpenCart();
  }

  checkCart() {
    const cart = this.cart;
    for (const i in cart) {
      if (cart[i].mono && cart[i].mono.user_id
        && this.mono && this.mono.user_id
        && this.mono.user_id === cart[i].mono.user_id
        && cart[i].cart_items && cart[i].cart_items.length > 0) {
        this.isMonoCartEmpty = false;
        return;
      }
    }
    this.isMonoCartEmpty = true;
    this.changeDetectorRef.markForCheck();
  }

  updateSelectedCityTeached(cityTeached: CityTeached) {
    // this.agendaComponent.updateSelectedCityTeached(cityTeached);
    this.cityTeached = cityTeached;
  }

  onSportTeachedChanged(sportTeached: SportTeached) {
    this.sportTeached = sportTeached;
  }

  onCityTeachedChanged(cityTeached: CityTeached) {
    this.cityTeached = cityTeached;
  }

  isCartMonoNotEmpty(): boolean {
    return !this.isMonoCartEmpty;
  }
}
