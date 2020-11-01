import { getMarketDataBaseUrl } from '.';

export const getHoursForMultipleMarketsUrl = () =>
  `${getMarketDataBaseUrl()}/hours`;

export const getHoursForSingleMarket = (market: string) =>
  `${getMarketDataBaseUrl()}/${market}/hours`;
