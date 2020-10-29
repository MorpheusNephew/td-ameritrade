import TdAmeritradeClient from '.';

export default class MoversClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getMovers = () => {};
}
