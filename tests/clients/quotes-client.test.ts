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
    const expectedResult = createMock<Quote>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const result = await client.quotes.getQuote('My quote');

    expect(result.data).toBe(expectedResult);
  });

  it('should get quotes', async () => {
    const expectedResult = createMock<Quote[]>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const result = await client.quotes.getQuotes(['my quote']);

    expect(result.data).toBe(expectedResult);
  });
});
