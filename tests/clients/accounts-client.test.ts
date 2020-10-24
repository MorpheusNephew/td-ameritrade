import { createMock } from 'ts-auto-mock';
import axios from 'axios';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';
import { Account } from '@morpheusnephew/td-ameritrade-models';

jest.mock('axios');

describe('Auth client tests', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let client: TdAmeritradeClient;

  beforeEach(() => {
    const clientOptions = createMock<ClientOptions>();
    client = new TdAmeritradeClient(clientOptions);
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  it('should get all accounts', async () => {
    const expectedResult = createMock<Account[]>();

    mockedAxios.get.mockResolvedValueOnce({
      data: expectedResult,
    });

    const result = await client.accounts.getAllAccounts();

    expect(result.data).toBe(expectedResult);
  });

  it('should get an account', async () => {
    const expectedResult = createMock<Account>();

    mockedAxios.get.mockResolvedValueOnce({
      data: expectedResult,
    });

    const result = await client.accounts.getAccount('accountId');

    expect(result.data).toBe(expectedResult);
  });
});
