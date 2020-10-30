import { createMock } from 'ts-auto-mock';
import axios from 'axios';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';
import {
  Preferences,
  SubscriptionKey,
  UserPrincipal,
} from '@morpheusnephew/td-ameritrade-models';

jest.mock('axios');

describe('User info client tests', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let client: TdAmeritradeClient;

  beforeEach(() => {
    const clientOptions = createMock<ClientOptions>();
    client = new TdAmeritradeClient(clientOptions);
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  it('should get preferences', async () => {
    const expectedResult = createMock<Preferences>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const result = await client.userInfo.getPreferences('accountId');

    expect(result.data).toBe(expectedResult);
  });

  it('should get streamer subscription keys', async () => {
    const expectedResult = createMock<SubscriptionKey[]>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const result = await client.userInfo.getStreamerSubscriptionKeys([
      'accountId',
    ]);

    expect(result.data).toBe(expectedResult);
  });

  it('should get user principals', async () => {
    const expectedResult = createMock<UserPrincipal>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const result = await client.userInfo.getUserPrincipals();

    expect(result.data).toBe(expectedResult);
  });

  it('should update user preferences', async () => {
    mockedAxios.put.mockResolvedValueOnce({ status: '200' });

    const userPreferences = createMock<Preferences>();

    const result = await client.userInfo.updatePreferences(
      'accountId',
      userPreferences
    );

    expect(result.status).toBe('200');
  });
});
