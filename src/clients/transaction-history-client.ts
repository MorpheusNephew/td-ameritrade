import { Transaction } from '@morpheusnephew/td-ameritrade-models';
import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import TdAmeritradeClient from '.';
import { queryStringOptions } from '../config';
import { numberOrString } from '../urls';
import {
  getTransactionsUrl,
  getTransactionUrl,
} from '../urls/transaction-history-urls';

export type TransactionType =
  | 'ALL'
  | 'TRADE'
  | 'BUY_ONLY'
  | 'SELL_ONLY'
  | 'CASH_IN_OR_CASH_OUT'
  | 'CHECKING'
  | 'DIVIDEND'
  | 'INTEREST'
  | 'OTHER'
  | 'ADVISOR_FEES';

export default class TransactionHistoryClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getTransaction = (
    accountId: numberOrString,
    transactionId: numberOrString
  ): Promise<AxiosResponse<Transaction>> => {
    const url = getTransactionUrl(accountId, transactionId);

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<Transaction>(url, authConfig)
    );
  };

  getTransactions = (
    accountId: numberOrString,
    type: TransactionType,
    symbol: string,
    startDate: string,
    endDate: string
  ): Promise<AxiosResponse<Transaction[]>> => {
    const queryString = qs.stringify(
      { type, symbol, startDate, endDate },
      queryStringOptions
    );

    const url = `${getTransactionsUrl(accountId)}${queryString}`;

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<Transaction[]>(url, authConfig)
    );
  };
}
