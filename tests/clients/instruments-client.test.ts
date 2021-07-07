import { createMock } from 'ts-auto-mock';
import Axios from 'axios';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';
import { Instrument } from '@morpheusnephew/td-ameritrade-models';

jest.mock('axios');

describe('Instruments client tests', () => {
  let mockedAxios: jest.Mocked<typeof Axios>;
  let client: TdAmeritradeClient;

  beforeEach(() => {
    const clientOptions = createMock<ClientOptions>();
    client = new TdAmeritradeClient(clientOptions);
    mockedAxios = Axios as jest.Mocked<typeof Axios>;
  });

  it('should get all instruments', async () => {
    const expectedResult = createMock<Instrument[]>();

    mockedAxios.get.mockResolvedValueOnce({
      data: expectedResult,
    });

    const { data } = await client.instruments.getInstruments(
      'Hi',
      'symbol-search'
    );

    expect(data).toBe(expectedResult);
  });

  it('it should get instrument', async () => {
    const expectedResult = createMock<Instrument>();

    mockedAxios.get.mockResolvedValueOnce({
      data: expectedResult,
    });

    const { data } = await client.instruments.getInstrument('my cusip');

    expect(data).toBe(expectedResult);
  });
});
