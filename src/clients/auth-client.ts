import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import {
  Token as AccessTokenResponse,
  TokenRequest as AccessTokenRequest,
} from '@morpheusnephew/td-ameritrade-models';
import TdAmeritradeClient from '.';
import { getAccessTokenUrl } from '..';

export default class AuthClient {
  private _client: TdAmeritradeClient;

  constructor(client: TdAmeritradeClient) {
    this._client = client;
  }

  authenticate = async (
    code: string,
    state?: string,
  ): Promise<AxiosResponse<AccessTokenResponse>> => {
    const body: AccessTokenRequest = {
      client_id: this._client.clientId,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this._client.redirectUri,
      access_type: 'offline',
      state: state,
    };

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
