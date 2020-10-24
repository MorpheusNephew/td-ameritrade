import { createMock } from 'ts-auto-mock';
import axios from 'axios';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';
import { Token } from '@morpheusnephew/td-ameritrade-models';

jest.mock('axios');

describe('Auth client tests', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let client: TdAmeritradeClient;

  beforeEach(() => {
    const clientOptions = createMock<ClientOptions>();
    client = new TdAmeritradeClient(clientOptions);
    mockedAxios = axios as jest.Mocked<typeof axios>;
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
