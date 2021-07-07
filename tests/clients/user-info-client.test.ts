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

    const { data } = await client.userInfo.getPreferences('accountId');

    expect(data).toBe(expectedResult);
  });

  it('should get streamer subscription keys', async () => {
    const expectedResult = createMock<SubscriptionKey[]>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const { data } = await client.userInfo.getStreamerSubscriptionKeys([
      'accountId',
    ]);

    expect(data).toBe(expectedResult);
  });

  it('should get user principals', async () => {
    const expectedResult = createMock<UserPrincipal>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const { data } = await client.userInfo.getUserPrincipals();

    expect(data).toBe(expectedResult);
  });

  it('should update user preferences', async () => {
    mockedAxios.put.mockResolvedValueOnce({ status: '200' });

    const userPreferences = createMock<Preferences>();

    const { status } = await client.userInfo.updatePreferences(
      'accountId',
      userPreferences
    );

    expect(status).toBe('200');
  });
});
