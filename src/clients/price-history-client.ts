import { CandleList } from '@morpheusnephew/td-ameritrade-models';
import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import TdAmeritradeClient from '.';
import { queryStringOptions } from '../config';
import { getPriceHistoryUrl } from '../urls/price-history-urls';

export type PeriodType = 'day' | 'month' | 'year' | 'ytd';
export type FrequencyType = '';

export interface PriceHistoryOptions {
  apiKey?: string;
  periodType?: PeriodType;
  period?: number;
  frequencyType?: FrequencyType;
  frequency?: number;
  endDate?: Date;
  startDate?: Date;
  needExtendedHoursData?: boolean;
};

export default class PriceHistoryClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getPriceHistory = (symbol: string, options: PriceHistoryOptions): Promise<AxiosResponse<CandleList>> => {
    const queryString = qs.stringify(options, queryStringOptions);

    const url = `${getPriceHistoryUrl(symbol)}${queryString}`;

    return this._client._makeRequest(async (authConfig) => await Axios.get<CandleList>(url, authConfig));
  };
}
