import { Order } from '@morpheusnephew/td-ameritrade-models';
import { createMock } from 'ts-auto-mock';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';
import {
  IOrdersByPathOptions,
  IOrdersByQueryOptions,
} from '../../src/clients/orders-client';

jest.mock('axios');

describe('Orders client tests', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let client: TdAmeritradeClient;

  beforeEach(() => {
    const clientOptions = createMock<ClientOptions>();
    client = new TdAmeritradeClient(clientOptions);
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  it('should cancel order', async () => {
    const accountId = uuid();
    const orderId = uuid();

    await client.orders.cancelOrder(accountId, orderId);

    expect(mockedAxios.delete).toBeCalled();
  });

  it('should get order', async () => {
    const expectedResult = createMock<Order>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const accountId = uuid();
    const orderId = uuid();

    const { data } = await client.orders.getOrder(accountId, orderId);

    expect(data).toBe(expectedResult);
  });

  it('should get orders by path', async () => {
    const expectedResult = createMock<Order[]>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const accountId = uuid();
    const ordersByPathOptions = createMock<IOrdersByPathOptions>();

    const { data } = await client.orders.getOrdersByPath(
      accountId,
      ordersByPathOptions
    );

    expect(data).toBe(expectedResult);
  });

  it('should get orders by query', async () => {
    const expectedResult = createMock<Order[]>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const ordersByQueryOptions = createMock<IOrdersByQueryOptions>();

    const { data } = await client.orders.getOrdersByQuery(ordersByQueryOptions);

    expect(data).toBe(expectedResult);
  });

  it('should place order', async () => {
    const accountId = uuid();
    const order = createMock<Order>();

    await client.orders.placeOrder(accountId, order);

    expect(mockedAxios.post).toBeCalled();
  });

  it('should replace order', async () => {
    const accountId = uuid();
    const orderId = uuid();
    const order = createMock<Order>();

    await client.orders.replaceOrder(accountId, orderId, order);

    expect(mockedAxios.put).toBeCalled();
  });
});
