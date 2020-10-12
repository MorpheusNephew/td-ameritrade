export default class Client {
  consumerKey: string;

  redirectUri: string;

  accessToken?: string;

  refreshToken?: string;

  constructor(
    consumerKey: string,
    redirectUri: string,
    accessToken?: string,
    refreshToken?: string,
  ) {
    this.consumerKey = consumerKey;
    this.redirectUri = encodeURI(redirectUri);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  authenticate = () => {
  };

  refreshAccessToken = () => {};

  refreshRefreshToken = () => {};
}
