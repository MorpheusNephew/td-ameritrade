import { createMock } from 'ts-auto-mock';
import axios from 'axios';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';
import { OptionChain } from '@morpheusnephew/td-ameritrade-models';
import { OptionChainOptions } from '../../src/clients/option-chains-client';

jest.mock('axios');

describe('Option chains client tests', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let client: TdAmeritradeClient;

  beforeEach(() => {
    const clientOptions = createMock<ClientOptions>();
    client = new TdAmeritradeClient(clientOptions);
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  it('should return option chain when calling getOptionChain', async () => {
    const expectedResult = createMock<OptionChain[]>();

    mockedAxios.get.mockResolvedValueOnce({
      data: expectedResult,
    });

    const optionChainOptions = createMock<OptionChainOptions>();

    const { data } = await client.optionChains.getOptionChain(
      optionChainOptions
    );

    expect(data).toBe(expectedResult);
  });
});
