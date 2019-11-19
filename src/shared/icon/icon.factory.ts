import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { InjectionToken } from '@angular/core';

export const ICONS: InjectionToken<string> = new InjectionToken<string>('icons');

export function iconFactory(matIconRegistry: MatIconRegistry,
                            domSanitizer: DomSanitizer,
                            icons?: {url: string, name: string}[]): () => void {
  return () => {
    // Enregistre font awesome dans le registre mat-icon
    // exemple : <mat-icon fontSet="fa" fontIcon="fa-search"></mat-icon>
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');

    if (icons) {
      // Enregistre toutes les icônes svg dans le registre mat-icon
      // exemple : <mat-icon svgIcon="search-icon"></mat-icon>
      icons.forEach(icon => {
        matIconRegistry.addSvgIcon(icon.name, domSanitizer.bypassSecurityTrustResourceUrl(icon.url));
      });
    }
  };
}
