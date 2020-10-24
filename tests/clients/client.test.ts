import { createMock } from 'ts-auto-mock';
import axios from 'axios';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TdAmeritradeClient tests', () => {
  let clientOptions: ClientOptions;

  beforeEach(() => {
    clientOptions = createMock<ClientOptions>();
  });

  it('should make request', async () => {
    const client = new TdAmeritradeClient(clientOptions);
    const value = {
      key: 'value',
    };

    const spy = jest.spyOn(client, '_getAuthConfig');

    mockedAxios.get.mockResolvedValue({
      data: value,
    });

    const result = await client._makeRequest((_) => mockedAxios.get(''));

    expect(result.data).toBe(value);
    expect(client._getAuthConfig).toBeCalledTimes(1);

    spy.mockReset();
    spy.mockRestore();
  });
});
