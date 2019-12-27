import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../seo/shared/seo.service';
import { StyleService } from '../shared/style.service';
import { Theme, ThemeStorageService } from '../shared/theme-storage.service';

@Component({
  selector: 'app-alr-layout-builder-edit',
  templateUrl: './layout-builder-edit.component.html',
  styleUrls: ['./layout-builder-edit.component.scss']
})
export class LayoutBuilderEditComponent implements OnInit {

  currentTheme: Theme;

  /**
   * List of available themes
   */
  themes: Theme[] = [
    {
      primary: '#673AB7',
      accent: '#FFC107',
      href: 'deeppurple-amber.css',
      isDark: false,
    },
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      href: 'indigo-pink.css',
      isDark: false,
      isDefault: true,
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      href: 'pink-bluegrey.css',
      isDark: true,
    },
    {
      primary: '#9C27B0',
      accent: '#4CAF50',
      href: 'purple-green.css',
      isDark: true,
    },
  ];

  constructor(private themeStorageService: ThemeStorageService,
              private styleService: StyleService,
              private seoService: SeoService) {
    this.seoService.setSeo('layout-builder');
  }

  ngOnInit() {
  }


  installTheme(theme: Theme) {
    this.currentTheme = this.getCurrentThemeFromHref(theme.href);

    if (theme.isDefault) {
      this.styleService.removeStyle('theme');
    } else {
      this.styleService.setStyle('theme', `assets/${theme.href}`);
    }

    if (this.currentTheme) {
      this.themeStorageService.storeTheme(this.currentTheme);
    }
  }

  private getCurrentThemeFromHref(href: string): Theme {
    return this.themes.find(theme => theme.href === href);
  }

}
