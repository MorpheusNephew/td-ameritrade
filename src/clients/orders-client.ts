import { Order } from '@morpheusnephew/td-ameritrade-models';
import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import TdAmeritradeClient from '.';
import { queryStringOptions } from '../config';
import {
  getLinkedAccountsOrders,
  getOrdersUrl,
  getOrderUrl,
  numberOrString,
} from '../urls';

export interface IOrdersByPathOptions {
  maxResults: number;
}

export type IOrdersByQueryOptions = IOrdersByPathOptions & {
  accountId: numberOrString;
};

export default class OrdersClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  cancelOrder = (accountId: numberOrString, orderId: numberOrString) => {
    const url = getOrderUrl(accountId, orderId);

    return this._client._makeRequest((authConfig) =>
      Axios.delete(url, authConfig)
    );
  };

  getOrder = (
    accountId: numberOrString,
    orderId: numberOrString
  ): Promise<AxiosResponse<Order>> => {
    const url = getOrderUrl(accountId, orderId);

    return this._client._makeRequest((authConfig) =>
      Axios.get(url, authConfig)
    );
  };

  getOrdersByPath = (
    accountId: numberOrString,
    options?: IOrdersByPathOptions
  ): Promise<AxiosResponse<Order[]>> => {
    const queryString = qs.stringify(options, queryStringOptions);
    const url = `${getOrdersUrl(accountId)}${queryString}`;

    return this._client._makeRequest((authConfig) =>
      Axios.get(url, authConfig)
    );
  };

  getOrdersByQuery = (
    options?: IOrdersByQueryOptions
  ): Promise<AxiosResponse<Order[]>> => {
    const queryString = qs.stringify(options, queryStringOptions);
    const url = `${getLinkedAccountsOrders()}${queryString}`;

    return this._client._makeRequest((authConfig) =>
      Axios.get(url, authConfig)
    );
  };

  placeOrder = (accountId: numberOrString, order: Order) => {
    const url = getOrdersUrl(accountId);

    return this._client._makeRequest((authConfig) =>
      Axios.post(url, order, authConfig)
    );
  };

  replaceOrder = (
    accountId: numberOrString,
    orderId: numberOrString,
    order: Order
  ) => {
    const url = getOrderUrl(accountId, orderId);

    return this._client._makeRequest((authConfig) =>
      Axios.put(url, order, authConfig)
    );
  };
}
