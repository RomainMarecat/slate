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

  /**
   * Associated cmsDetail key to get all children of current parent
   */
  parent?: string;

  /**
   * Possibly a mat icon text additional
   */
  icon?: string;

  /**
   * Helper to associate all CmsDetails in this attributes
   */
  children?: CmsDetail[];
}
