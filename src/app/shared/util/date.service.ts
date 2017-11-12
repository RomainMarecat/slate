import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  constructor() {}

  /**
   * Difference duration between 2 dates, it can be compared to UTC
   * @param  {Date} comparePast
   * @param  {Date} source
   * @return {Date}
   */
  diff(comparePast: Date, source: Date): Date {
    return new Date(source.valueOf() - comparePast.valueOf());
  }

  /**
   * isDate Check if value is right date format
   * @param  {any}   value
   * @return {boolean}
   */
  isDate(value: any): value is Date {
    return value instanceof Date && !isNaN(value.valueOf());
  }

  /**
   * Return string time when < 1 day
   * Return string date when >= 1 day
   * Compare to UTC format 1970-1-1
   * @param {Date} date
   * @todo translate
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
      return comparePast.toLocaleDateString('fr');
    }
    if (year <= 0 && month <= 0 && day <= 0 && hours <= 0 && minutes <= 1 && minutes >= 0) {
      return 'maintenant';
    }
    // Format to string locale fr
    return 'Il y a  ' + hour + ' h et ' + minute + ' min';
  }

  /**
   * Compare 2 date and return string duration
   * @param  Date           comparePast
   * @param  Date           source
   * @return {string}
   */
  compareDatetoHumanReadableString(comparePast: Date = new Date(), source: Date = new Date()): string {
    const diff = this.diff(source, comparePast);
    const readableTime = this.getHumanReadableDate(diff, comparePast);

    return readableTime;
  }



}
