import { Instrument } from '@morpheusnephew/td-ameritrade-models';
import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import TdAmeritradeClient from '.';
import { getInstrumentUrl, getInstrumentsUrl } from '..';

export type Projection =
  | 'symbol-search'
  | 'symbol-regex'
  | 'desc-search'
  | 'desc-regex'
  | 'fundamental';

export interface InstrumentOptions {
  symbol: string;
  projection: Projection;
}

export default class InstrumentsClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getInstruments = (
    instrumentOptions: InstrumentOptions
  ): Promise<AxiosResponse<Instrument[]>> => {
    const queryString = qs.stringify(instrumentOptions);

    const url = `${getInstrumentsUrl()}?${queryString}`;

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<Instrument[]>(url, authConfig)
    );
  };

  getInstrument = (cusip: string): Promise<AxiosResponse<Instrument>> => {
    const url = getInstrumentUrl(cusip);

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<Instrument>(url, authConfig)
    );
  };
}
