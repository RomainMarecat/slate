import { Injectable } from '@angular/core';

@Injectable()
export class StringService {
  /**
   * Transforme une chaine de camelCase vers snakeCase
   * @param camelCasedString
   */
  public static camelToSnake(camelCasedString: string): string {
    return camelCasedString.replace(/\W+/g, '_')
      .replace(/([a-z\d])([A-Z])/g, '$1_$2')
      .toLowerCase();
  }

  /**
   * Transforme une chaine de snake_case vers camelCase
   * @param snakeCasedString
   */
  public static snakeToCamel(snakeCasedString: string): string {
    return snakeCasedString.replace(/(_\w)/g, function(m) {
      return m[1].toUpperCase();
    });
  }

  /**
   * ucfirst php version JS
   *
   * @param string
   * @returns {string}
   */
  public static capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * Normalizer de chaine pour eviter des caracteres speciaux
   *
   * @param text
   * @returns {string}
   */
  public static slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }
}
