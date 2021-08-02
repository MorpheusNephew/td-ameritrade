import { getMarketDataBaseUrl } from '.';

export const getPriceHistoryUrl = (symbol: string) =>
  `${getMarketDataBaseUrl()}/${symbol}/pricehistory`;
