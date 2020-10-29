import TdAmeritradeClient from '.';

export default class UserInfoClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getPreferences = () => {};

  getStreamerSubscriptionKeys = () => {};

  getUserPrincipals = () => {};

  updatePreferences = () => {};
}
