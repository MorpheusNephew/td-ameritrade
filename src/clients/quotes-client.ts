import TdAmeritradeClient from '.';

export default class QuotesClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getQuote = () => {};

  getQuotes = () => {};
}
