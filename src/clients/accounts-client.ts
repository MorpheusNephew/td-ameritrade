import { Account } from '@morpheusnephew/td-ameritrade-models';
import axios, { AxiosResponse } from 'axios';
import TdAmeritradeClient from '.';
import { getAccountUrl, getAllAccountsUrl, numberOrString } from '../urls';

export default class AccountsClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getAllAccounts = (): Promise<AxiosResponse<Account[]>> => {
    const url = getAllAccountsUrl();

    return this._client._makeRequest(
      async (authConfig) => await axios.get<Account[]>(url, authConfig)
    );
  };

  getAccount = (accountId: numberOrString): Promise<AxiosResponse<Account>> => {
    const url = getAccountUrl(accountId);

    return this._client._makeRequest(
      async (authConfig) => await axios.get<Account>(url, authConfig)
    );
  };
}
