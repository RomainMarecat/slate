import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings, ManualParserLoader } from 'localize-router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { AdminGuard } from '../shared/guard/admin.guard';

export function ManualLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
  return new ManualParserLoader(translate, location, settings, ['fr', 'en'], 'routes.');
}

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'recipes',
    loadChildren: './recipe-list/recipe-list.module#RecipeListModule'
  },
  {
    path: 'recipe',
    loadChildren: './recipe-detail/recipe-detail.module#RecipeDetailModule'
  },
  {
    path: 'admin',
    loadChildren: './../shared/admin/app-recipe/app-recipe.module#AppRecipeModule'
  }
];

@NgModule({
  imports: [
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: ManualLoaderFactory,
        deps: [TranslateService, Location, LocalizeRouterSettings]
      },
      alwaysSetPrefix: false
    }),
    RouterModule.forRoot(routes, {
      enableTracing: false,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      scrollOffset: [0, 64] // [x, y]
    })
  ],
  exports: [
    LocalizeRouterModule,
    RouterModule,
  ],
  providers: [
    AdminGuard
  ]
})
export class AppRoutingModule {
}
