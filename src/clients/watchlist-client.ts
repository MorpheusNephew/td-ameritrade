import TdAmeritradeClient from '.';

export default class WatchlistClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  createWatchlist = () => {};

  deleteWatchlist = () => {};

  getWatchlist = () => {};

  getMultipleAccountsWatchlists = () => {};

  getAccountWatchlists = () => {};

  replaceWatchlist = () => {};

  updateWatchlist = () => {};
}
