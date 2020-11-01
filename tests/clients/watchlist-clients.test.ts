import { createMock } from 'ts-auto-mock';
import axios from 'axios';
import TdAmeritradeClient, { ClientOptions } from '../../src/clients';
import { Watchlist } from '@morpheusnephew/td-ameritrade-models';

jest.mock('axios');

describe('{name of client} client tests', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let client: TdAmeritradeClient;

  beforeEach(() => {
    const clientOptions = createMock<ClientOptions>();
    client = new TdAmeritradeClient(clientOptions);
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  it('should create a watchlist', async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: '201' });

    const watchlistToCreate = createMock<Watchlist>();

    const result = await client.watchlist.createWatchlist(
      'accountId',
      watchlistToCreate
    );

    expect(result.status).toBe('201');
  });

  it('should delete a watchlist', async () => {
    mockedAxios.delete.mockResolvedValueOnce({ status: '204' });

    const result = await client.watchlist.deleteWatchlist(
      'accountId',
      'watchlistId'
    );

    expect(result.status).toBe('204');
  });

  it('should get a watchlist', async () => {
    const expectedResult = createMock<Watchlist>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const result = await client.watchlist.getWatchlist(
      'accountId',
      'watchlistId'
    );

    expect(result.data).toBe(expectedResult);
  });

  it('should get watchlists from multiple accounts', async () => {
    const expectedResult = createMock<Watchlist[]>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const result = await client.watchlist.getMultipleAccountsWatchlists();

    expect(result.data).toBe(expectedResult);
  });

  it('should get account watchlists', async () => {
    const expectedResult = createMock<Watchlist[]>();

    mockedAxios.get.mockResolvedValueOnce({ data: expectedResult });

    const result = await client.watchlist.getAccountWatchlists('accountId');

    expect(result.data).toBe(expectedResult);
  });

  it('should replace a watchlist', async () => {
    mockedAxios.put.mockResolvedValueOnce({ status: '204' });

    const replacementWatchlist = createMock<Watchlist>();

    const result = await client.watchlist.replaceWatchlist(
      'accountId',
      'watchlistId',
      replacementWatchlist
    );

    expect(result.status).toBe('204');
  });

  it('should update a watchlist', async () => {
    mockedAxios.patch.mockResolvedValueOnce({ status: '204' });

    const updatedWatchlist = createMock<Watchlist>();

    const result = await client.watchlist.updateWatchlist(
      'accountId',
      'watchlistId',
      updatedWatchlist
    );

    expect(result.status).toBe('204');
  });
});
