export interface SlackMessage {
  /**
   * Minimum required field to send valid message
   * Text with a link example : "Hello World <https://alert-system.com/alerts/1234|Click here> ! Bye."
   */
  text: string | number | Date | boolean;

  /**
   * username personalization
   * "username": "Milou"
   */
  username?: string;

  /**
   * Send a icon slack like ":ghost:"
   */
  icon_emoji?: string;

  /**
   * Send a direct message to user or on a channel
   * example :
   * "channel": "#public-channel"
   * "channel": "#dev"
   *
   * or
   *
   *  "channel": "@username"
   *  "channel": "@tintin"
   */
  channel?: string;

  [key: string]: any;
}
