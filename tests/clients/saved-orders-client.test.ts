import { createMock } from 'ts-auto-mock';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';
import { SavedOrder } from '@morpheusnephew/td-ameritrade-models';

jest.mock('axios');

describe('Saved orders client tests', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let client: TdAmeritradeClient;

  beforeEach(() => {
    const clientOptions = createMock<ClientOptions>();
    client = new TdAmeritradeClient(clientOptions);
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  it('should make post request to create saved order', async () => {
    const accountId = uuid();
    const savedOrder = createMock<SavedOrder>();

    await client.savedOrders.createSavedOrder(accountId, savedOrder);

    expect(mockedAxios.post).toBeCalled();
  });

  it('should make delete reequest to delete order', async () => {
    const accountId = uuid();
    const savedOrderId = uuid();

    await client.savedOrders.deleteSavedOrder(accountId, savedOrderId);

    expect(mockedAxios.delete).toBeCalled();
  });

  it('should return saved order', async () => {
    const accountId = uuid();
    const savedOrderId = uuid();

    const expectedResult = createMock<SavedOrder>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const { data } = await client.savedOrders.getSavedOrder(
      accountId,
      savedOrderId
    );

    expect(data).toBe(expectedResult);
  });

  it('should return saved orders for accountId', async () => {
    const accountId = uuid();

    const expectedResult = createMock<SavedOrder[]>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const { data } = await client.savedOrders.getSavedOrdersByPath(accountId);

    expect(data).toBe(expectedResult);
  });

  it('should make put request to replace saved order', async () => {
    const accountId = uuid();
    const savedOrderId = uuid();
    const updatedSavedOrder = createMock<SavedOrder>();

    await client.savedOrders.replaceSavedOrder(
      accountId,
      savedOrderId,
      updatedSavedOrder
    );

    expect(mockedAxios.put).toBeCalled();
  });
});
