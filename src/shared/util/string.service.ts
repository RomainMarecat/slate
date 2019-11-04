import { Injectable } from '@angular/core';

@Injectable()
export class StringService {
  // tslint:disable
  static diacriticsMap = {
    '\u00C0': 'A',  // À => A
    '\u00C1': 'A',   // Á => A
    '\u00C2': 'A',   // Â => A
    '\u00C3': 'A',   // Ã => A
    '\u00C4': 'A',   // Ä => A
    '\u00C5': 'A',   // Å => A
    '\u00C6': 'AE', // Æ => AE
    '\u00C7': 'C',   // Ç => C
    '\u00C8': 'E',   // È => E
    '\u00C9': 'E',   // É => E
    '\u00CA': 'E',   // Ê => E
    '\u00CB': 'E',   // Ë => E
    '\u00CC': 'I',   // Ì => I
    '\u00CD': 'I',   // Í => I
    '\u00CE': 'I',   // Î => I
    '\u00CF': 'I',   // Ï => I
    '\u0132': 'IJ', // Ĳ => IJ
    '\u00D0': 'D',   // Ð => D
    '\u00D1': 'N',   // Ñ => N
    '\u00D2': 'O',   // Ò => O
    '\u00D3': 'O',   // Ó => O
    '\u00D4': 'O',   // Ô => O
    '\u00D5': 'O',   // Õ => O
    '\u00D6': 'O',   // Ö => O
    '\u00D8': 'O',   // Ø => O
    '\u0152': 'OE', // Œ => OE
    '\u00DE': 'TH', // Þ => TH
    '\u00D9': 'U',   // Ù => U
    '\u00DA': 'U',   // Ú => U
    '\u00DB': 'U',   // Û => U
    '\u00DC': 'U',   // Ü => U
    '\u00DD': 'Y',   // Ý => Y
    '\u0178': 'Y',   // Ÿ => Y
    '\u00E0': 'a',   // à => a
    '\u00E1': 'a',   // á => a
    '\u00E2': 'a',   // â => a
    '\u00E3': 'a',   // ã => a
    '\u00E4': 'a',   // ä => a
    '\u00E5': 'a',   // å => a
    '\u00E6': 'ae', // æ => ae
    '\u00E7': 'c',   // ç => c
    '\u00E8': 'e',   // è => e
    '\u00E9': 'e',   // é => e
    '\u00EA': 'e',   // ê => e
    '\u00EB': 'e',   // ë => e
    '\u00EC': 'i',   // ì => i
    '\u00ED': 'i',   // í => i
    '\u00EE': 'i',   // î => i
    '\u00EF': 'i',   // ï => i
    '\u0133': 'ij', // ĳ => ij
    '\u00F0': 'd',   // ð => d
    '\u00F1': 'n',   // ñ => n
    '\u00F2': 'o',   // ò => o
    '\u00F3': 'o',   // ó => o
    '\u00F4': 'o',   // ô => o
    '\u00F5': 'o',   // õ => o
    '\u00F6': 'o',   // ö => o
    '\u00F8': 'o',   // ø => o
    '\u0153': 'oe', // œ => oe
    '\u00DF': 'ss', // ß => ss
    '\u00FE': 'th', // þ => th
    '\u00F9': 'u',   // ù => u
    '\u00FA': 'u',   // ú => u
    '\u00FB': 'u',   // û => u
    '\u00FC': 'u',   // ü => u
    '\u00FD': 'y',   // ý => y
    '\u00FF': 'y',   // ÿ => y
    '\uFB00': 'ff', // ﬀ => ff
    '\uFB01': 'fi',   // ﬁ => fi
    '\uFB02': 'fl', // ﬂ => fl
    '\uFB03': 'ffi',  // ﬃ => ffi
    '\uFB04': 'ffl',  // ﬄ => ffl
    '\uFB05': 'ft', // ﬅ => ft
    '\uFB06': 'st'  // ﬆ => st
    // tslint:enable
  };

  /**
   * Replace special chars
   */
  static replaceDiacritics(str: string) {
    let returnStr = '';
    if (str) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < str.length; i++) {
        if (StringService.diacriticsMap[str[i]]) {
          returnStr += StringService.diacriticsMap[str[i]];
        } else {
          returnStr += str[i];
        }
      }
    }
    return returnStr;
  }

  /**
   * Transforme une chaine de camelCase vers snakeCase
   */
  static camelToSnake(camelCasedString: string): string {
    return camelCasedString.replace(/\W+/g, '_')
      .replace(/([a-z\d])([A-Z])/g, '$1_$2')
      .toLowerCase();
  }

  /**
   * Transforme une chaine de snake_case vers camelCase
   */
  static snakeToCamel(snakeCasedString: string): string {
    return snakeCasedString.replace(/(_\w)/g, (m) => {
      return m[1].toUpperCase();
    });
  }

  /**
   * ucfirst php version JS
   */
  static capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  /**
   * Normalizer de chaine pour eviter des caracteres speciaux
   */
  static slugify(text: string): string {
    if (!text) {
      return '';
    }

    return StringService.replaceDiacritics(text.toString().toLowerCase())
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }
}
