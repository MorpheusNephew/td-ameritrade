import AuthClient from './auth-client';

export interface ClientOptions {
  clientId: string;
  redirectUri: string;
  accessToken?: string;
  refreshToken?: string;
}

export default class Client {
  clientId: string;
  redirectUri: string;
  accessToken?: string;
  refreshToken?: string;
  auth: AuthClient;

  constructor(options: ClientOptions) {
    const { clientId, redirectUri, accessToken, refreshToken } = options;
    this.clientId = clientId;
    this.redirectUri = encodeURI(redirectUri);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    this.auth = new AuthClient(this);
  }

  getAuthConfig = () => ({
    headers: {
      authorization: `Bearer ${this.accessToken}`,
    },
  });

  refreshAccessToken = () => {};

  refreshRefreshToken = () => {};
}
