import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../loader/loader.service';
import { UserService } from '../../user/shared/user.service';
import { AlertService } from '../../popup/alert.service';
import { User } from '@firebase/auth-types';
import { Favorite } from '../shared/favorite';
import { FavoriteService } from '../shared/favorite.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {

  favorites: Favorite[] = [];

  isLoading: boolean;

  constructor(private favoriteService: FavoriteService,
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
      this.favoriteService.filters$.next([
        {
          column: 'user',
          operator: '==',
          value: user.uid
        }
      ]);
      this.favoriteService.getFavorites()
        .subscribe((favorites: Favorite[]) => {
          this.loaderService.hide();
          this.favorites = favorites;
          this.isLoading = false;
        }, () => {
          this.loaderService.hide();
          this.alertService.show('error.api.general');
          this.isLoading = false;
        });
    });

  }

}