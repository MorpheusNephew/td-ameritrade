import { Account } from '@morpheusnephew/td-ameritrade-models';
import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import TdAmeritradeClient from '.';
import { getAccountUrl, getAllAccountsUrl, numberOrString } from '../urls';

export type Fields = 'positions' | 'orders';

export default class AccountsClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getAllAccounts = (fields?: Fields[]): Promise<AxiosResponse<Account[]>> => {
    const queryString = qs.stringify(
      { fields },
      { arrayFormat: 'comma', addQueryPrefix: true, skipNulls: true }
    );

    const url = `${getAllAccountsUrl()}${queryString}`;

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<Account[]>(url, authConfig)
    );
  };

  getAccount = (
    accountId: numberOrString,
    fields?: Fields[]
  ): Promise<AxiosResponse<Account>> => {
    const queryString = qs.stringify(
      { fields },
      { arrayFormat: 'comma', addQueryPrefix: true, skipNulls: true }
    );

    const url = `${getAccountUrl(accountId)}${queryString}`;

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<Account>(url, authConfig)
    );
  };
}
