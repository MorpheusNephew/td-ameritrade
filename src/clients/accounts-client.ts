import { Account } from '@morpheusnephew/td-ameritrade-models';
import Axios from 'axios';
import TdAmeritradeClient from '.';
import { getAccountUrl, getAllAccountsUrl, numberOrString } from '../urls';

export default class AccountsClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getAllAccounts = () => {
    const url = getAllAccountsUrl();

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<Account[]>(url, authConfig)
    );
  };

  getAccount = (accountId: numberOrString) => {
    const url = getAccountUrl(accountId);

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<Account>(url, authConfig)
    );
  };
}
