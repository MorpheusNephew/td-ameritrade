import { getAccessTokenUrl } from '../../src';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';
import { Token, TokenRequest } from '@morpheusnephew/td-ameritrade-models';
import Axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { createMock } from 'ts-auto-mock';
import { v4 as uuid } from 'uuid';

jest.mock('axios');

describe('Auth client tests', () => {
  let mockedAxios: jest.Mocked<typeof Axios>;
  let client: TdAmeritradeClient;

  beforeEach(() => {
    const clientOptions = createMock<ClientOptions>();
    client = new TdAmeritradeClient(clientOptions);
    mockedAxios = Axios as jest.Mocked<typeof Axios>;
  });

  describe('_request()', () => {
    it('should make auth request', async () => {
      const tokenRequest = createMock<TokenRequest>();
      const expectedResult = createMock<Token>();

      mockedAxios.post.mockResolvedValueOnce({
        data: expectedResult,
      });

      const { data } = await client.auth._request(tokenRequest);

      expect(data).toBe(expectedResult);
    });

    it('should make request with proper parameters', async () => {
      const tokenRequest = createMock<TokenRequest>();

      mockedAxios.post.mockResolvedValueOnce({
        data: null,
      });

      await client.auth._request(tokenRequest);

      expect(mockedAxios.post).toBeCalledWith(
        getAccessTokenUrl(),
        qs.stringify(tokenRequest),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      );
    });

    it('should only update access_token', async () => {
      const tokenRequest = createMock<TokenRequest>();
      const expectedResult = createMock<Token>();

      expectedResult.access_token = uuid();

      mockedAxios.post.mockResolvedValueOnce({
        data: expectedResult,
      });

      const { accessToken, refreshToken } = client;

      await client.auth._request(tokenRequest);

      expect(client.accessToken).not.toBe(accessToken);
      expect(client.refreshToken).toBe(refreshToken);
    });

    it('should only update refresh token', async () => {
      const tokenRequest = createMock<TokenRequest>();
      const expectedResult = createMock<Token>();

      expectedResult.refresh_token = uuid();

      mockedAxios.post.mockResolvedValueOnce({
        data: expectedResult,
      });

      const { accessToken, refreshToken } = client;

      await client.auth._request(tokenRequest);

      expect(client.accessToken).toBe(accessToken);
      expect(client.refreshToken).not.toBe(refreshToken);
    });
  });

  describe('authenticate()', () => {
    it('should make request with proper parameters', async () => {
      const code = uuid();
      const state = uuid();
      const response = createMock<AxiosResponse<Token>>();

      const expectedParams: TokenRequest = {
        client_id: client.clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: client.redirectUri,
        access_type: 'offline',
        state,
      };

      client.auth._request = jest.fn().mockResolvedValueOnce(response);

      await client.auth.authenticate(code, state);

      expect(client.auth._request).toBeCalledWith(expectedParams);
    });
  });

  describe('refreshAccessToken()', () => {
    it('should make request with proper parameters', async () => {
      const response = createMock<AxiosResponse<Token>>();

      const expectedParams: TokenRequest = {
        client_id: client.clientId,
        grant_type: 'refresh_token',
        refresh_token: client.refreshToken,
      };

      client.auth._request = jest.fn().mockResolvedValueOnce(response);

      await client.auth.refreshAccessToken();

      expect(client.auth._request).toBeCalledWith(expectedParams);
    });
  });

  describe('refreshRefreshToken()', () => {
    it('should make request with proper parameters', async () => {
      const response = createMock<AxiosResponse<Token>>();

      const expectedParams: TokenRequest = {
        access_type: 'offline',
        client_id: client.clientId,
        grant_type: 'refresh_token',
        refresh_token: client.refreshToken,
      };

      client.auth._request = jest.fn().mockResolvedValueOnce(response);

      await client.auth.refreshRefreshToken();

      expect(client.auth._request).toBeCalledWith(expectedParams);
    });
  });
});
