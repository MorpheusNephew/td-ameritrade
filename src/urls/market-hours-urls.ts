import { getBaseApiUrl } from '.';

export const getMarketHoursBaseUrl = () => `${getBaseApiUrl()}/marketdata`;

export const getHoursForMultipleMarketsUrl = () =>
  `${getMarketHoursBaseUrl()}/hours`;

export const getHoursForSingleMarket = (market: string) =>
  `${getMarketHoursBaseUrl()}/${market}/hours`;
