import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterSettings, ManualParserLoader } from 'localize-router';

export function localizeLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
  return new ManualParserLoader(translate, location, settings, ['fr', 'en'], 'routes.');
}
