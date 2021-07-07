import { CandleList } from '@morpheusnephew/td-ameritrade-models';
import { createMock } from 'ts-auto-mock';
import axios from 'axios';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';
import { PriceHistoryOptions } from '../../src/clients/price-history-client';

jest.mock('axios');

describe('Price history client tests', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let client: TdAmeritradeClient;

  beforeEach(() => {
    const clientOptions = createMock<ClientOptions>();
    client = new TdAmeritradeClient(clientOptions);
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  it('should throw notImplemented when getPriceHistory is called', async () => {
    const expectedResult = createMock<CandleList>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const symbol = "mySymbol";
    const priceHistoryOptions = createMock<PriceHistoryOptions>();

    const { data } = await client.priceHistory.getPriceHistory(symbol, priceHistoryOptions);

    expect(data).toBe(expectedResult);
  });
});
