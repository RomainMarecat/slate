import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '../i18n/i18n.service';

@Injectable()
export class DateService {

  constructor(private translateService: TranslateService, private i18nService: I18nService) {
  }

  /**
   * Difference duration between 2 dates, it can be compared to UTC
   */
  diff(comparePast: Date, source: Date): Date {
    return new Date(source.valueOf() - comparePast.valueOf());
  }

  /**
   * isDate Check if value is right date format
   */
  isDate(value: any): value is Date {
    return value instanceof Date && !isNaN(value.valueOf());
  }

  /**
   * Return string time when < 1 day
   * Return string date when >= 1 day
   * Compare to UTC format 1970-1-1
   */
  getHumanReadableDate(date: Date = new Date(), comparePast: Date = new Date()): string {
    const years = date.getUTCFullYear();
    const months = date.getUTCMonth();
    const days = date.getUTCDay();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    const year = years - 1970;
    const month = months;
    const day = days - 4;
    const hour = hours.toString();
    const minute = minutes.toString();
    const second = seconds.toString();
    // Go always in this case : Refacto all this function
    if (year > 0 || month > 0 || day > 0) {
      return comparePast.toLocaleDateString(this.i18nService.locale);
    }
    if (year <= 0 && month <= 0 && day <= 0 && hours <= 0 && minutes <= 1 && minutes >= 0) {
      return this.translateService.instant('date.now');
    }
    // Format to string locale fr
    return this.translateService.instant('date.prefix', {value: hour}) +
      this.translateService.instant('date.short_hour') +
      minute +
      this.translateService.instant('date.and') +
      this.translateService.instant('date.short_min');
  }

  /**
   * Compare 2 date and return string duration
   */
  compareDatetoHumanReadableString(comparePast: Date = new Date(), source: Date = new Date()): string {
    const diff = this.diff(source, comparePast);
    const readableTime = this.getHumanReadableDate(diff, comparePast);

    return readableTime;
  }


}
