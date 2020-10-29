import { createMock } from 'ts-auto-mock';
import axios from 'axios';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';
import { MarketHours } from '@morpheusnephew/td-ameritrade-models';

jest.mock('axios');

describe('MarketHours client tests', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let client: TdAmeritradeClient;

  beforeEach(() => {
    const clientOptions = createMock<ClientOptions>();
    client = new TdAmeritradeClient(clientOptions);
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  it('should get hours for multiple markets', async () => {
    const expectedResult = createMock<MarketHours[]>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const result = await client.marketHours.getMultipleMarketHours(
      ['BOND', 'EQUITY'],
      new Date()
    );

    expect(result.data).toBe(expectedResult);
  });

  it('should get hours for a single market', async () => {
    const expectedResult = createMock<MarketHours>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const result = await client.marketHours.getMarketHours('BOND', new Date());

    expect(result.data).toBe(expectedResult);
  });
});
