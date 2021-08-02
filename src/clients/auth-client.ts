import TdAmeritradeClient from '.';
import { getAccessTokenUrl } from '..';
import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import {
  Token as AccessTokenResponse,
  TokenRequest as AccessTokenRequest,
} from '@morpheusnephew/td-ameritrade-models';

export default class AuthClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  authenticate = (
    code: string,
    state?: string
  ): Promise<AxiosResponse<AccessTokenResponse>> => {
    const body: AccessTokenRequest = {
      client_id: this._client.clientId,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this._client.redirectUri,
      access_type: 'offline',
      state: state,
    };

    return this._request(body);
  };

  refreshAccessToken = (): Promise<AxiosResponse<AccessTokenResponse>> => {
    const body: AccessTokenRequest = {
      client_id: this._client.clientId,
      grant_type: 'refresh_token',
      refresh_token: this._client.refreshToken,
    };

    return this._request(body);
  };

  refreshRefreshToken = (): Promise<AxiosResponse<AccessTokenResponse>> => {
    const body: AccessTokenRequest = {
      access_type: 'offline',
      client_id: this._client.clientId,
      grant_type: 'refresh_token',
      refresh_token: this._client.refreshToken,
    };

    return this._request(body);
  };

  _request = async (body: AccessTokenRequest) => {
    const response = await Axios.post<AccessTokenResponse>(
      getAccessTokenUrl(),
      qs.stringify(body),
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    );

    const { data } = response;

    if (data) {
      this._client.accessToken = data.access_token ?? this._client.accessToken;
      this._client.refreshToken =
        data.refresh_token ?? this._client.refreshToken;
    }

    return response;
  };
}
