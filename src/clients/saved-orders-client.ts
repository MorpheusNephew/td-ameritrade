import { SavedOrder } from '@morpheusnephew/td-ameritrade-models';
import Axios, { AxiosResponse } from 'axios';
import TdAmeritradeClient from '.';
import {
  getAccountSavedOrdersUrl,
  getSavedOrderUrl,
  numberOrString,
} from '../urls';

export default class SavedOrdersClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  createSavedOrder = (accountId: numberOrString, savedOrder: SavedOrder) => {
    const url = getAccountSavedOrdersUrl(accountId);

    return this._client._makeRequest((authConfig) =>
      Axios.post(url, savedOrder, authConfig)
    );
  };

  deleteSavedOrder = (
    accountId: numberOrString,
    savedOrderId: numberOrString
  ) => {
    const url = getSavedOrderUrl(accountId, savedOrderId);

    return this._client._makeRequest((authConfig) =>
      Axios.delete(url, authConfig)
    );
  };

  getSavedOrder = (
    accountId: numberOrString,
    savedOrderId: numberOrString
  ): Promise<AxiosResponse<SavedOrder>> => {
    const url = getSavedOrderUrl(accountId, savedOrderId);

    return this._client._makeRequest((authConfig) =>
      Axios.get(url, authConfig)
    );
  };

  getSavedOrdersByPath = (
    accountId: numberOrString
  ): Promise<AxiosResponse<SavedOrder[]>> => {
    const url = getAccountSavedOrdersUrl(accountId);

    return this._client._makeRequest((authConfig) =>
      Axios.get(url, authConfig)
    );
  };

  replaceSavedOrder = (
    accountId: numberOrString,
    savedOrderId: numberOrString,
    savedOrder: SavedOrder
  ) => {
    const url = getSavedOrderUrl(accountId, savedOrderId);

    return this._client._makeRequest((authConfig) =>
      Axios.put(url, savedOrder, authConfig)
    );
  };
}
