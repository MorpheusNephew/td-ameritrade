import { createMock } from 'ts-auto-mock';
import axios from 'axios';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';
import { Quote } from '../../src/clients/quotes-client';

jest.mock('axios');

describe('Quotes client tests', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let client: TdAmeritradeClient;

  beforeEach(() => {
    const clientOptions = createMock<ClientOptions>();
    client = new TdAmeritradeClient(clientOptions);
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  it('should get quote', async () => {
    const expectedResult = createMock<Quote>(
      Object({
        symbol: 'AMC',
      })
    );

    mockedAxios.get.mockImplementationOnce((url: string) => {
      if (url === 'https://api.tdameritrade.com/v1/marketdata/AMC/quotes') {
        return Promise.resolve({
          data: Object({
            AMC: Object({
              symbol: 'AMC',
              netPercentChangeInDouble: 0,
              markChangeInDouble: 0,
              markPercentChangeInDouble: 0,
              regularMarketPercentChangeInDouble: 0,
              delayed: false,
              realtimeEntitled: false,
            }),
          }),
        });
      } else {
        return Promise.resolve({ data: `unknown url: ${url}` });
      }
    });

    const { data } = await client.quotes.getQuote('AMC');

    expect(data).toEqual(expectedResult);
  });

  it('should get quotes', async () => {
    const expectedResult = createMock<Quote[]>([
      {
        symbol: 'AMC',
      } as any,
      {
        symbol: 'GME',
      } as any,
    ]);

    mockedAxios.get.mockImplementationOnce((url: string) => {
      if (
        url ===
        'https://api.tdameritrade.com/v1/marketdata/quotes?symbol=my%20quote'
      ) {
        return Promise.resolve({
          data: {
            AMC: {
              symbol: 'AMC',
            },
            GME: {
              symbol: 'GME',
            },
          },
        });
      } else {
        return Promise.resolve({ data: `unknown url: ${url}` });
      }
    });

    const { data } = await client.quotes.getQuotes(['my quote']);

    expect(data).toEqual(expectedResult);
  });
});
