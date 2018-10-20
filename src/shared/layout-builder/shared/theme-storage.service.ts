import { EventEmitter, Injectable } from '@angular/core';

export interface Theme {
  primary: string;
  accent: string;
  href: string;
  isDark?: boolean;
  isDefault?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ThemeStorageService {

  static storageKey = 'theme-storage-current';

  /**
   * On theme update
   */
  onThemeUpdate: EventEmitter<Theme> = new EventEmitter<Theme>();

  /**
   * set chosen theme in local storage
   */
  storeTheme(theme: Theme) {
    try {
      window.localStorage[ThemeStorageService.storageKey] = JSON.stringify(theme);
    } catch (e) {
    }

    this.onThemeUpdate.emit(theme);
  }

  /**
   * get theme in localstorage
   */
  getStoredTheme(): Theme {
    try {
      return JSON.parse(window.localStorage[ThemeStorageService.storageKey] || null);
    } catch (e) {
      return null;
    }
  }

  /**
   * reset theme by default with clear local storage
   */
  clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorageService.storageKey);
    } catch (e) {
    }
  }

}
