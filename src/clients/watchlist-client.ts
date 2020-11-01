import { Watchlist } from '@morpheusnephew/td-ameritrade-models';
import Axios, { AxiosResponse } from 'axios';
import TdAmeritradeClient from '.';
import { numberOrString } from '../urls';
import {
  getMultipleAccountsWatchlistsUrl,
  getWatchlistsUrl,
  getWatchlistUrl,
} from '../urls/watchlist-urls';

export default class WatchlistClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  createWatchlist = (
    accountId: numberOrString,
    watchlist: Watchlist
  ): Promise<AxiosResponse<any>> => {
    const url = getWatchlistsUrl(accountId);

    return this._client._makeRequest(
      async (authConfig) => await Axios.post(url, watchlist, authConfig)
    );
  };

  deleteWatchlist = (
    accountId: numberOrString,
    watchlistId: numberOrString
  ): Promise<AxiosResponse<any>> => {
    const url = getWatchlistUrl(accountId, watchlistId);

    return this._client._makeRequest(
      async (authConfig) => await Axios.delete(url, authConfig)
    );
  };

  getWatchlist = (
    accountId: numberOrString,
    watchlistId: numberOrString
  ): Promise<AxiosResponse<Watchlist>> => {
    const url = getWatchlistUrl(accountId, watchlistId);

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<Watchlist>(url, authConfig)
    );
  };

  getMultipleAccountsWatchlists = (): Promise<AxiosResponse<Watchlist[]>> => {
    const url = getMultipleAccountsWatchlistsUrl();

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<Watchlist[]>(url, authConfig)
    );
  };

  getAccountWatchlists = (
    accountId: numberOrString
  ): Promise<AxiosResponse<Watchlist>> => {
    const url = getWatchlistsUrl(accountId);

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<Watchlist>(url, authConfig)
    );
  };

  replaceWatchlist = (
    accountId: numberOrString,
    watchlistId: numberOrString,
    watchlist: Watchlist
  ): Promise<AxiosResponse<any>> => {
    const url = getWatchlistUrl(accountId, watchlistId);

    return this._client._makeRequest(
      async (authConfig) => await Axios.put(url, watchlist, authConfig)
    );
  };

  updateWatchlist = (
    accountId: numberOrString,
    watchlistId: numberOrString,
    watchlist: Watchlist
  ): Promise<AxiosResponse<any>> => {
    const url = getWatchlistUrl(accountId, watchlistId);

    return this._client._makeRequest(
      async (authConfig) => await Axios.patch(url, watchlist, authConfig)
    );
  };
}
