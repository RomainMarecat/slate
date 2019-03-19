import { Component, Input, OnInit } from '@angular/core';
import { CategoryOption } from '../../../../shared/category/category-option';
import { Category } from '../../../../shared/category/category';
import { CategoryService } from '../../../../shared/category/category.service';
import { FavoriteService } from '../../../../shared/favorite/shared/favorite.service';
import { Favorite } from '../../../../shared/favorite/shared/favorite';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from '../../../../shared/user/shared/user.service';
import { User } from '@firebase/auth-types';

@Component({
  selector: 'app-category-favorite-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  @Input() options: CategoryOption;

  categories: Category[] = [];

  favorites: Favorite[] = [];

  constructor(private categoryService: CategoryService,
              private favoriteService: FavoriteService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.getFavoriteCategories();
  }

  getFavoriteCategories() {
    this.getUser();
  }

  getFavorites(user: User) {
    this.favoriteService.filters$.next([
      {
        column: 'user',
        operator: '==',
        value: user.uid
      },
      {
        column: 'nb_view',
        operator: '>',
        value: 3
      }
    ]);
    this.favoriteService.getFavorites()
      .pipe(
        take(1)
      )
      .subscribe((favorites) => {
        this.favorites = favorites;
        this.favorites.forEach((favorite) => {
          if (favorite.category && favorite.nb_view > 3) {
            this.categoryService.getCategory(favorite.category)
              .subscribe((category) => {
                this.categories = [...this.categories, ...[category]];
              });
          }
        });
      });
  }

  getUser() {
    const subscription: Subscription = this.userService.getCurrentUser()
      .pipe(
        take(1)
      )
      .subscribe((user) => {
        if (subscription) {
          subscription.unsubscribe();
        }

        if (user) {
          this.getFavorites(user);
          return;
        }
      });
  }
}
