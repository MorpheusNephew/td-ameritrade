import TdAmeritradeClient from '.';

export default class OrdersClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  cancelOrder = () => {};

  getOrder = () => {};

  getOrdersByPath = () => {};

  getOrdersByQuery = () => {};

  placeOrder = () => {};

  replaceOrder = () => {};
}
