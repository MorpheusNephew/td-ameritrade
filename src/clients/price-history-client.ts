import TdAmeritradeClient from '.';

export default class PriceHistoryClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getPriceHistory = () => {};
}
