import TdAmeritradeClient from '.';

export default class TransactionHistoryClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getTransaction = () => {};

  getTransactions = () => {};
}
