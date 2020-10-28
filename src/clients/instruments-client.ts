import { Instrument } from '@morpheusnephew/td-ameritrade-models';
import axios, { AxiosResponse } from 'axios';
import TdAmeritradeClient from '.';
import { getInstrumentUrl, getInstrumentsUrl } from '..';

export default class InstrumentsClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getInstruments = (): Promise<AxiosResponse<Instrument[]>> => {
    const url = getInstrumentsUrl();

    return this._client._makeRequest(
      async (authConfig) => await axios.get(url, authConfig)
    );
  };

  getInstrument = (cusip: string): Promise<AxiosResponse<Instrument>> => {
    const url = getInstrumentUrl(cusip);

    return this._client._makeRequest(
      async (authConfig) => await axios.get(url, authConfig)
    );
  };
}
