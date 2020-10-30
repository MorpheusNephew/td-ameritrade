import {
  Preferences,
  SubscriptionKey,
  UserPrincipal,
} from '@morpheusnephew/td-ameritrade-models';
import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import TdAmeritradeClient from '.';
import { queryStringOptions } from '../config';
import { numberOrString } from '../urls';
import {
  getPreferencesUrl,
  getSubscriptionKeysUrl,
  getUserPrincipalsUrl,
} from '../urls/user-info-urls';

export type UserPrincipalField =
  | 'streamerSubscriptionKeys'
  | 'streamerConnectionInfo'
  | 'preferences'
  | 'surrogateIds';

export default class UserInfoClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  getPreferences = (
    accountId: numberOrString
  ): Promise<AxiosResponse<Preferences>> => {
    const url = getPreferencesUrl(accountId);

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<Preferences>(url, authConfig)
    );
  };

  getStreamerSubscriptionKeys = (
    accountIds: numberOrString[]
  ): Promise<AxiosResponse<SubscriptionKey[]>> => {
    const queryString = qs.stringify({ accountIds }, queryStringOptions);

    const url = `${getSubscriptionKeysUrl()}${queryString}`;

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<SubscriptionKey[]>(url, authConfig)
    );
  };

  getUserPrincipals = (fields?: UserPrincipalField[]) => {
    const queryString = qs.stringify({ fields }, queryStringOptions);

    const url = `${getUserPrincipalsUrl()}${queryString}`;

    return this._client._makeRequest(
      async (authConfig) => await Axios.get<UserPrincipal>(url, authConfig)
    );
  };

  updatePreferences = (
    accountId: numberOrString,
    userPreferences: Preferences
  ) => {
    const url = getPreferencesUrl(accountId);

    return this._client._makeRequest(
      async (authConfig) => await Axios.put(url, userPreferences, authConfig)
    );
  };
}
