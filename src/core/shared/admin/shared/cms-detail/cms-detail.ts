export class CmsDetail {
  /**
   * Primary
   * Identifier of CmsDetail
   * @type string
   */
  key?: string;
  /**
   * Cms key representation
   * @type string
   */
  cms: string;

  /**
   * Key of cms value
   * @type string
   */
  title: string;

  /**
   * cms value | text | html
   * @type string
   */
  content: string;
}
