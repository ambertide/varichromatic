/**
 * Represents a social media connection.
 */
export interface Social {
  /**
   * Type of the social media.
   * ie: twitter, facebook.
   */
  type: string;
  /**
   * Username in the said social media.
   */
  value: string;
  /**
   * Part of the url before the username.
   */
  baseURL: string;
}
