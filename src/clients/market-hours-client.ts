import { MarketHours } from '@morpheusnephew/td-ameritrade-models';
import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import TdAmeritradeClient from '.';
import {
  getHoursForMultipleMarketsUrl,
  getHoursForSingleMarket,
} from '../urls';

export type Market = 'EQUITY' | 'OPTION' | 'FUTURE' | 'BOND' | 'FOREX';

export default class MarketHoursClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getMultipleMarketHours = (
    markets: Market[],
    date: Date
  ): Promise<AxiosResponse<MarketHours[]>> => {
    const queryString = qs.stringify(
      {
        markets,
        date,
      },
      { addQueryPrefix: true, arrayFormat: 'comma' }
    );

    const url = `${getHoursForMultipleMarketsUrl()}${queryString}`;

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<MarketHours[]>(url, authConfig)
    );
  };

  getMarketHours = (
    market: Market,
    date: Date
  ): Promise<AxiosResponse<MarketHours>> => {
    const queryString = qs.stringify({ date }, { addQueryPrefix: true });

    const url = `${getHoursForSingleMarket(market)}${queryString}`;

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<MarketHours>(url, authConfig)
    );
  };
}
