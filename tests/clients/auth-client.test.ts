import { createMock } from 'ts-auto-mock';
import Axios from 'axios';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';
import { Token } from '@morpheusnephew/td-ameritrade-models';

jest.mock('axios');

describe('Auth client tests', () => {
  let mockedAxios: jest.Mocked<typeof Axios>;
  let client: TdAmeritradeClient;

  beforeEach(() => {
    const clientOptions = createMock<ClientOptions>();
    client = new TdAmeritradeClient(clientOptions);
    mockedAxios = Axios as jest.Mocked<typeof Axios>;
  });

  it('should ', async () => {
    const expectedResult = createMock<Token>();

    mockedAxios.post.mockResolvedValueOnce({
      data: expectedResult,
    });

    const result = await client.auth.authenticate('code');

    expect(result.data).toBe(expectedResult);
  });
});
