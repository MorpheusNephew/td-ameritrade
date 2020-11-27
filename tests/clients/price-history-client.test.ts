import { createMock } from 'ts-auto-mock';
import axios from 'axios';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';

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
    expect(() => client.priceHistory.getPriceHistory()).toThrow(
      'Not Implemented'
    );
  });
});
