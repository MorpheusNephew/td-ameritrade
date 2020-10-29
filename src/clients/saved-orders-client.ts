import TdAmeritradeClient from '.';

export default class SavedOrdersClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  createSavedOrder = () => {};

  deleteSavedOrder = () => {};

  getSavedOrder = () => {};

  getSavedOrdersByPath = () => {};

  replaceSavedOrder = () => {};
}
