import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvExtratorService {

  replacements: {needle: any[], replace: any[]};

  constructor() {
    this.setReplacements();
  }

  /**
   * Extract all row from a csv file
   */
  extractData(csv, separator: string = ';', enclosedBy: string = '"'): Array<any> {
    const allTextLines = csv.split(/\r\n|\n/);

    const csvHeader = allTextLines[0].split(separator);
    const headers = Object.keys(csvHeader).map((index: string) => {
      return this.deleteEnclosure(csvHeader[index], enclosedBy);
    });

    const lines = [];

    allTextLines.forEach((line, i) => {
      // First row header
      if (i === 0) {
        return;
      }
      // Split line in multiple array values
      const row = line.split(separator);
      // When header length === row length
      if (row.length === headers.length) {
        let currentObj = {};

        // add value into an empty object
        for (let j = 0; j < headers.length; j++) {
          currentObj[headers[j]] = row[j];
        }

        currentObj = this.processData(currentObj, enclosedBy);
        // Add new object into array of row
        lines.push(currentObj);
      }
    });

    return lines;
  }

  /**
   * Process values of object
   */
  processData(object: object, enclosedBy: string): object {
    Object.keys(object).forEach((index: string) => {

      // Supprime toutes les occurences de " en trop au début et à la fin
      object[index] = this.deleteEnclosure(object[index], enclosedBy);
      // Change string number to number
      object[index] = this.convertToNumber(object[index]);
      // process data with array of needle / replacement
      object[index] = this.replaceWith(object[index], this.replacements.needle, this.replacements.replace);


    });

    return object;
  }

  deleteEnclosure(value, encloseBy: string) {
    return this.replaceAll(value, encloseBy, '');
  }

  private replaceAll(value, search, replacement) {
    return value.replace(new RegExp(search, 'g'), replacement);
  }


  /**
   * Convert all pseudo string number values to number, ex: "123" => 123
   */
  convertToNumber(value: any) {
    if (this.isNumber(value)) {
      return parseInt(value, 10);
    }

    return value;
  }

  /**
   * Regex test number
   */
  isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }


  /**
   * Replace value with array of replacement
   */
  replaceWith(value, oldValue, newValue) {
    const replaceIndex = oldValue.indexOf(value);
    if (replaceIndex !== -1) {
      value = newValue[replaceIndex];
    }

    return value;
  }

  setReplacements() {
    this.replacements = {
      needle: ['NULL', '0'],
      replace: [null, 0]
    };
  }
}
