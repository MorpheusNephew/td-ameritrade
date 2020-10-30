import { getBaseApiUrl } from '.';

export const getMarketDataBaseUrl = () => `${getBaseApiUrl()}/marketdata`;

export const getHoursForMultipleMarketsUrl = () =>
  `${getMarketDataBaseUrl()}/hours`;

export const getHoursForSingleMarket = (market: string) =>
  `${getMarketDataBaseUrl()}/${market}/hours`;
