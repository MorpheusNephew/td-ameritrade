import TdAmeritradeClient from '.';
import { notImplemented } from '../errors';

export default class OrdersClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  cancelOrder = () => {
    notImplemented();
  };

  getOrder = () => {
    notImplemented();
  };

  getOrdersByPath = () => {
    notImplemented();
  };

  getOrdersByQuery = () => {
    notImplemented();
  };

  placeOrder = () => {
    notImplemented();
  };

  replaceOrder = () => {
    notImplemented();
  };
}
