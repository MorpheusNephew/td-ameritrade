import { AxiosResponse } from 'axios';
import AuthClient from './auth-client';
import AccountsClient from './accounts-client';

export interface ClientOptions {
  clientId: string;
  redirectUri: string;
  accessToken?: string;
  refreshToken?: string;
}

export default class TdAmeritradeClient {
  clientId: string;
  redirectUri: string;
  accessToken?: string;
  refreshToken?: string;
  accounts: AccountsClient;
  auth: AuthClient;

  constructor(options: ClientOptions) {
    const { clientId, redirectUri, accessToken, refreshToken } = options;
    this.clientId = clientId;
    this.redirectUri = encodeURI(redirectUri);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    this.accounts = new AccountsClient(this);
    this.auth = new AuthClient(this);
  }

  _makeRequest = async <T>(
    request: (authConfig: {}) => Promise<AxiosResponse<T>>
  ): Promise<AxiosResponse<T>> => {
    const authConfig = this._getAuthConfig();

    return await request(authConfig);
  };

  _getAuthConfig = () => ({
    headers: {
      authorization: `Bearer ${this.accessToken}`,
    },
  });
}
