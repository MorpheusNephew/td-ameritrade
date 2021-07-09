import { AxiosResponse } from 'axios';
import AuthClient from './auth-client';
import AccountsClient from './accounts-client';
import InstrumentsClient from './instruments-client';
import MarketHoursClient from './market-hours-client';
import MoversClient from './movers-client';
import OptionChainsClient from './option-chains-client';
import OrdersClient from './orders-client';
import PriceHistoryClient from './price-history-client';
import QuotesClient from './quotes-client';
import SavedOrdersClient from './saved-orders-client';
import TransactionHistoryClient from './transaction-history-client';
import UserInfoClient from './user-info-client';
import WatchlistClient from './watchlist-client';

export interface ClientOptions {
  clientId: string;
  redirectUri: string;
  accessToken?: string;
  refreshToken?: string;
}

export default class TdAmeritradeClient {
  clientId: string;
  redirectUri: string;
  accessToken?: string;
  refreshToken?: string;
  accounts: AccountsClient;
  auth: AuthClient;
  instruments: InstrumentsClient;
  marketHours: MarketHoursClient;
  movers: MoversClient;
  optionChains: OptionChainsClient;
  orders: OrdersClient;
  priceHistory: PriceHistoryClient;
  quotes: QuotesClient;
  savedOrders: SavedOrdersClient;
  transactionHistory: TransactionHistoryClient;
  userInfo: UserInfoClient;
  watchlist: WatchlistClient;

  constructor(options: ClientOptions) {
    const { clientId, redirectUri, accessToken, refreshToken } = options;
    this.clientId = clientId;
    this.redirectUri = encodeURI(redirectUri);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    this.accounts = new AccountsClient(this);
    this.auth = new AuthClient(this);
    this.instruments = new InstrumentsClient(this);
    this.marketHours = new MarketHoursClient(this);
    this.movers = new MoversClient(this);
    this.optionChains = new OptionChainsClient(this);
    this.orders = new OrdersClient(this);
    this.priceHistory = new PriceHistoryClient(this);
    this.quotes = new QuotesClient(this);
    this.savedOrders = new SavedOrdersClient(this);
    this.transactionHistory = new TransactionHistoryClient(this);
    this.userInfo = new UserInfoClient(this);
    this.watchlist = new WatchlistClient(this);
  }

  _makeRequest = <T>(
    request: (authConfig: {}) => Promise<AxiosResponse<T>>
  ): Promise<AxiosResponse<T>> => {
    const authConfig = this._getAuthConfig();

    return request(authConfig);
  };

  _getAuthConfig = () => ({
    headers: {
      authorization: `Bearer ${this.accessToken}`,
    },
  });
}
