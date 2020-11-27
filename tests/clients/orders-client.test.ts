import { createMock } from 'ts-auto-mock';
import axios from 'axios';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';

jest.mock('axios');

describe('Orders client tests', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let client: TdAmeritradeClient;

  beforeEach(() => {
    const clientOptions = createMock<ClientOptions>();
    client = new TdAmeritradeClient(clientOptions);
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  it('should throw notImplemented when cancelOrder is called', async () => {
    expect(() => client.orders.cancelOrder()).toThrow('Not Implemented');
  });

  it('should throw notImplemented when getOrder is called', async () => {
    expect(() => client.orders.getOrder()).toThrow('Not Implemented');
  });

  it('should throw notImplemented when getOrdersByPath is called', async () => {
    expect(() => client.orders.getOrdersByPath()).toThrow('Not Implemented');
  });

  it('should throw notImplemented when getOrdersByQuery is called', async () => {
    expect(() => client.orders.getOrdersByQuery()).toThrow('Not Implemented');
  });

  it('should throw notImplemented when placeOrder is called', async () => {
    expect(() => client.orders.placeOrder()).toThrow('Not Implemented');
  });

  it('should throw notImplemented when replaceOrder is called', async () => {
    expect(() => client.orders.replaceOrder()).toThrow('Not Implemented');
  });
});
