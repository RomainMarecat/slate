import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from '../../menu/menu.service';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta,
              private title: Title,
              private menuService: MenuService,
              private translateService: TranslateService) {
  }

  disableZoom() {
    this.meta.updateTag({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
    });
  }

  reactiveZoom() {
    this.meta.updateTag({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    });
  }

  /**
   * Seo's activation with entity type meta title and description
   */
  setSeo(type: string, parameters: object = {}) {
    this.translateService.get([`meta.title.${type}`, `meta.description.${type}`, `menu.title.${type}`], parameters)
      .subscribe((translations: string[]) => {
        this.meta.updateTag({name: 'description', content: translations[`meta.description.${type}`]});
        this.title.setTitle(translations[`meta.title.${type}`]);
        if (`menu.title.${type}` !== translations[`menu.title.${type}`]) {
          this.menuService.nextTitle(`menu.title.${type}`);
        }
      });
  }

  addTag(name: string, description: string, property: string = 'name') {
    this.translateService.get(description)
      .subscribe((translation: string) => {
        const tag = {content: translation};
        tag[property] = name;
        this.meta.addTag(tag);
      });
  }
}
