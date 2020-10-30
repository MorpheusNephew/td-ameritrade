import {
  EquityQuote,
  ForexQuote,
  FutureOptionsQuote,
  FutureQuote,
  IndexQuote,
  MutualFundQuote,
  OptionQuote,
} from '@morpheusnephew/td-ameritrade-models';
import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import TdAmeritradeClient from '.';
import { queryStringOptions } from '../config';
import { getQuotesUrl, getQuoteUrl } from '../urls/quote-urls';

export type Quote = FutureQuote &
  EquityQuote &
  ForexQuote &
  FutureOptionsQuote &
  IndexQuote &
  MutualFundQuote &
  OptionQuote;

export default class QuotesClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getQuote = (
    symbol: string,
    apiKey?: string
  ): Promise<AxiosResponse<Quote>> => {
    const queryString = qs.stringify({ apiKey }, queryStringOptions);

    const url = `${getQuoteUrl(symbol)}${queryString}`;

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<Quote>(url, authConfig)
    );
  };

  getQuotes = (
    symbol: string[],
    apiKey?: string
  ): Promise<AxiosResponse<Quote[]>> => {
    const queryString = qs.stringify({ symbol, apiKey }, queryStringOptions);

    const url = `${getQuotesUrl}${queryString}`;

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<Quote[]>(url, authConfig)
    );
  };
}
