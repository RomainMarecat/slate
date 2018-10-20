export interface CmsDetail {
  /**
   * Primary
   * Identifier of CmsDetail
   */
  key?: string;
  /**
   * Cms key representation
   */
  cms: string;

  /**
   * Key of cms value
   */
  title: string;

  /**
   * cms value | text | html
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
