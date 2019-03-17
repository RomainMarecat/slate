import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../loader/loader.service';
import { AlertService } from '../../popup/alert.service';
import { DeliveryService } from '../../cart/shared/delivery.service';
import { Delivery } from '../../cart/shared/delivery';
import { UserService } from '../../user/shared/user.service';
import { User } from '@firebase/auth-types';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  deliveries: Delivery[] = [];

  isLoading: boolean;

  constructor(private deliveryService: DeliveryService,
              private loaderService: LoaderService,
              private userService: UserService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getDeliveries();
  }

  /**
   * La liste des commandes
   */
  getDeliveries() {
    this.isLoading = true;
    this.loaderService.show();
    this.userService.getAuthState().subscribe((user: User) => {
      this.deliveryService.filters$.next([
        {
          column: 'user',
          operator: '==',
          value: user.uid
        }
      ]);
      this.deliveryService.getDeliveries()
        .subscribe((res: Delivery[]) => {
          this.loaderService.hide();
          this.deliveries = res;
          this.isLoading = false;
        }, () => {
          this.loaderService.hide();
          this.alertService.show('error.api.general');
          this.isLoading = false;
        });
    });

  }
}
