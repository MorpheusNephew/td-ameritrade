import TdAmeritradeClient from '.';
import { notImplemented } from '../errors';

export default class PriceHistoryClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getPriceHistory = () => {
    notImplemented();
  };
}
