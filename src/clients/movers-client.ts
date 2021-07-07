import { Mover } from '@morpheusnephew/td-ameritrade-models';
import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import TdAmeritradeClient from '.';
import { queryStringOptions } from '../config';
import { getMoversUrl, Index } from '../urls';

export type Direction = 'up' | 'down';

export type Change = 'value' | 'percent';

export default class MoversClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getMovers = (
    index: Index,
    direction?: Direction,
    change?: Change
  ): Promise<AxiosResponse<Mover[]>> => {
    const queryString = qs.stringify({ direction, change }, queryStringOptions);

    const url = `${getMoversUrl(index)}${queryString}`;

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<Mover[]>(url, authConfig)
    );
  };
}
