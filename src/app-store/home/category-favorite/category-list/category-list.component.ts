import { Component, Input, OnInit } from '@angular/core';
import { CategoryOption } from '../../../../shared/category/category-option';
import { Category } from '../../../../shared/category/category';
import { CategoryService } from '../../../../shared/category/category.service';
import { FavoriteService } from '../../../../shared/favorite/shared/favorite.service';
import { Favorite } from '../../../../shared/favorite/shared/favorite';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from '../../../../shared/user/shared/user.service';
import { User } from 'firebase/app';

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
    this.favoriteService.getUserFavoritesByNbView(user)
      .subscribe((favorites) => {
        this.favorites = favorites;
        this.favorites.forEach((favorite) => {
          this.categoryService.getCategory(favorite.category)
            .pipe(
              take(1)
            )
            .subscribe((category) => {
              this.categories = [...this.categories, ...[category]];
            });
        });
      }, () => {
        this.favorites = [];
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
