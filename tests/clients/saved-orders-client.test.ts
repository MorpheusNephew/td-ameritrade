import { createMock } from 'ts-auto-mock';
import axios from 'axios';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';

jest.mock('axios');

describe('Saved orders client tests', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let client: TdAmeritradeClient;

  beforeEach(() => {
    const clientOptions = createMock<ClientOptions>();
    client = new TdAmeritradeClient(clientOptions);
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  it('should throw notImplemented when createSavedOrder is called', async () => {
    expect(() => client.savedOrders.createSavedOrder()).toThrow(
      'Not Implemented'
    );
  });

  it('should throw notImplemented when deleteSavedOrder is called', async () => {
    expect(() => client.savedOrders.deleteSavedOrder()).toThrow(
      'Not Implemented'
    );
  });

  it('should throw notImplemented when getSavedOrder is called', async () => {
    expect(() => client.savedOrders.getSavedOrder()).toThrow('Not Implemented');
  });

  it('should throw notImplemented when getSavedOrdersByPath is called', async () => {
    expect(() => client.savedOrders.getSavedOrdersByPath()).toThrow(
      'Not Implemented'
    );
  });

  it('should throw notImplemented when replaceSavedOrder is called', async () => {
    expect(() => client.savedOrders.replaceSavedOrder()).toThrow(
      'Not Implemented'
    );
  });
});
