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

  it('should get price history - defaults', async () => {
    const symbol = 'OSTK';
    const priceHistoryOptions = createMock<PriceHistoryOptions>();
    const expectedResult = createMock<CandleList>({
      candles: [
        {
          open: 70.95,
          high: 71.7,
          low: 69.1,
          close: 69.39,
          volume: 608751,
          datetime: 1631595600000,
        },
      ],
      symbol: 'OSTK',
      empty: false,
    });

    mockedAxios.get.mockImplementationOnce((url: string) => {
      if (
        url === 'https://api.tdameritrade.com/v1/marketdata/OSTK/pricehistory'
      ) {
        return Promise.resolve({
          data: {
            candles: [
              {
                open: 70.95,
                high: 71.7,
                low: 69.1,
                close: 69.39,
                volume: 608751,
                datetime: 1631595600000,
              },
            ],
            symbol: 'OSTK',
            empty: false,
          },
        });
      } else {
        return Promise.resolve({ data: `unknown url: ${url}` });
      }
    });

    const { data } = await client.priceHistory.getPriceHistory(
      symbol,
      priceHistoryOptions
    );

    expect(data).toEqual(expectedResult);
  });

  it('should get price history', async () => {
    const symbol = 'OSTK';
    const priceHistoryOptions = createMock<PriceHistoryOptions>({
      periodType: 'day',
      period: 1,
      frequencyType: 'minute',
      frequency: 5,
      endDate: 1631595600000,
      startDate: 1631595610000,
      needExtendedHoursData: true,
    });
    const expectedResult = createMock<CandleList>({
      candles: [
        {
          open: 70.95,
          high: 71.7,
          low: 69.1,
          close: 69.39,
          volume: 608751,
          datetime: 1631595600000,
        },
      ],
      symbol: 'OSTK',
      empty: false,
    });

    mockedAxios.get.mockImplementationOnce((url: string) => {
      if (
        url ===
        'https://api.tdameritrade.com/v1/marketdata/OSTK/pricehistory?periodType=day&period=1&frequencyType=minute&frequency=5&endDate=1631595600000&startDate=1631595610000&needExtendedHoursData=true'
      ) {
        return Promise.resolve({
          data: {
            candles: [
              {
                open: 70.95,
                high: 71.7,
                low: 69.1,
                close: 69.39,
                volume: 608751,
                datetime: 1631595600000,
              },
            ],
            symbol: 'OSTK',
            empty: false,
          },
        });
      } else {
        return Promise.resolve({ data: `unknown url: ${url}` });
      }
    });

    const { data } = await client.priceHistory.getPriceHistory(
      symbol,
      priceHistoryOptions
    );

    expect(data).toEqual(expectedResult);
  });
});
