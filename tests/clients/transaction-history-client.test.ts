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

    const { data } = await client.transactionHistory.getTransaction(
      'accountId',
      'transactionId'
    );

    expect(data).toBe(expectedResult);
  });

  it('should get transactions', async () => {
    const expectedResult = createMock<Transaction[]>([
      {
        type: 'TRADE',
        subAccount: '4',
        settlementDate: '2021-10-07',
        description: 'CLOSE SHORT POSITION',
        fees: {
          rFee: 0,
        },
        transactionItem: {
          amount: 100,
          price: 74.8499,
          cost: -7484.99,
          instruction: 'BUY',
        },
      },
    ]);

    mockedAxios.get.mockImplementationOnce((url: string) => {
      if (
        url ===
        'https://api.tdameritrade.com/v1/accounts/accountId/transactions?type=ALL&symbol=symbol&startDate=2021-10-05&endDate=2021-10-06'
      ) {
        return Promise.resolve({
          data: [
            {
              type: 'TRADE',
              subAccount: '4',
              settlementDate: '2021-10-07',
              description: 'CLOSE SHORT POSITION',
              fees: {
                rFee: 0,
              },
              transactionItem: {
                amount: 100,
                price: 74.8499,
                cost: -7484.99,
                instruction: 'BUY',
              },
            },
          ],
        });
      } else {
        return Promise.resolve({ data: `unknown url: ${url}` });
      }
    });

    const { data } = await client.transactionHistory.getTransactions(
      'accountId',
      'ALL',
      'symbol',
      '2021-10-05',
      '2021-10-06'
    );

    expect(data).toEqual(expectedResult);
  });
});
