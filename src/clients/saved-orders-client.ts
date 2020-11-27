import TdAmeritradeClient from '.';
import { notImplemented } from '../errors';

export default class SavedOrdersClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  createSavedOrder = () => {
    notImplemented();
  };

  deleteSavedOrder = () => {
    notImplemented();
  };

  getSavedOrder = () => {
    notImplemented();
  };

  getSavedOrdersByPath = () => {
    notImplemented();
  };

  replaceSavedOrder = () => {
    notImplemented();
  };
}
