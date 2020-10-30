import { createMock } from 'ts-auto-mock';
import axios from 'axios';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';
import { Transaction } from '@morpheusnephew/td-ameritrade-models';

jest.mock('axios');

describe('Transaction history client tests', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let client: TdAmeritradeClient;

  beforeEach(() => {
    const clientOptions = createMock<ClientOptions>();
    client = new TdAmeritradeClient(clientOptions);
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  it('should get transaction', async () => {
    const expectedResult = createMock<Transaction>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const result = await client.transactionHistory.getTransaction(
      'accountId',
      'transactionId'
    );

    expect(result.data).toBe(expectedResult);
  });

  it('should get transaction', async () => {
    const expectedResult = createMock<Transaction[]>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const result = await client.transactionHistory.getTransactions(
      'accountId',
      'ALL',
      'symbol',
      new Date(),
      new Date()
    );

    expect(result.data).toBe(expectedResult);
  });
});
