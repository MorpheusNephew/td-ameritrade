import TdAmeritradeClient from '.';

export default class MarketHoursClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getMultipleMarketHours = () => {};

  getMarketHours = () => {};
}
