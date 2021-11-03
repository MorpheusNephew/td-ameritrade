import { createMock } from 'ts-auto-mock';
import axios from 'axios';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';
import { Quote, QuoteResponse } from '../../src/clients/quotes-client';

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
    const expectedResult = createMock<QuoteResponse>({
      AMC: {
        symbol: 'AMC',
      },
    });

    mockedAxios.get.mockImplementationOnce((url: string) => {
      if (url === 'https://api.tdameritrade.com/v1/marketdata/AMC/quotes') {
        return Promise.resolve({
          data: {
            AMC: {
              symbol: 'AMC',
            },
          },
        });
      } else {
        return Promise.resolve({ data: `unknown url: ${url}` });
      }
    });

    const { data } = await client.quotes.getQuote('AMC');

    expect(data).toEqual(expectedResult);
  });

  it('should get quotes', async () => {
    const expectedResult = createMock<QuoteResponse>({
      AMC: {
        symbol: 'AMC',
      },
      GME: {
        symbol: 'GME',
      },
    });

    mockedAxios.get.mockImplementationOnce((url: string) => {
      if (
        url ===
        'https://api.tdameritrade.com/v1/marketdata/quotes?symbol=AMC%2CGME'
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

    const { data } = await client.quotes.getQuotes(['AMC,GME']);

    expect(data).toEqual(expectedResult);
  });
});
