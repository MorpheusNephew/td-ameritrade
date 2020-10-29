import { createMock } from 'ts-auto-mock';
import axios from 'axios';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';
import { Mover } from '@morpheusnephew/td-ameritrade-models';

jest.mock('axios');

describe('Movers client tests', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let client: TdAmeritradeClient;

  beforeEach(() => {
    const clientOptions = createMock<ClientOptions>();
    client = new TdAmeritradeClient(clientOptions);
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  it('should get movers', async () => {
    const expectedResult = createMock<Mover>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const result = await client.movers.getMovers('$COMPX');

    expect(result.data).toBe(expectedResult);
  });
});
