import { OptionChain } from '@morpheusnephew/td-ameritrade-models';
import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import TdAmeritradeClient from '.';
import { queryStringOptions } from '../config';
import { numberOrString } from '../urls';
import { getOptionChainUrl } from '../urls/options-url';

export interface OptionChainOptions {
  apiKey?: string;
  symbol: string;
  contractType?: 'ALL' | 'CALL' | 'PUT';
  strikeCount: numberOrString;
  includeQuotes?: boolean;
  strategy?:
    | 'SINGLE'
    | 'ANALYTICAL'
    | 'COVERED'
    | 'VERTICAL'
    | 'CALENDAR'
    | 'STRANGLE'
    | 'STRADDLE'
    | 'BUTTERFLY'
    | 'CONDOR'
    | 'DIAGONAL'
    | 'COLLAR'
    | 'ROLL';
  interval: numberOrString;
  strike: numberOrString;
  range?: 'ALL' | 'ITM' | 'NTM' | 'OTM' | 'SAK' | 'SBK' | 'SNK';
  fromDate: Date;
  toDate: Date;
  volatility: numberOrString;
  underlyingPrice: numberOrString;
  interestRate: numberOrString;
  daysToExpiration: numberOrString;
  expMonth?:
    | 'ALL'
    | 'JAN'
    | 'FEB'
    | 'MAR'
    | 'APR'
    | 'MAY'
    | 'JUN'
    | 'JUL'
    | 'AUG'
    | 'SEP'
    | 'OCT'
    | 'NOV'
    | 'DEC';
  optionType?: 'ALL' | 'S' | 'NS';
}

export default class OptionChainsClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getOptionChain = (
    optionChainOptions: OptionChainOptions
  ): Promise<AxiosResponse<any>> => {
    const queryString = qs.stringify(optionChainOptions, queryStringOptions);

    const url = `${getOptionChainUrl()}${queryString}`;

    return this._client._makeRequest(
      async (authConfig) => await Axios.get(url, authConfig)
    );
  };
}
