import { baseApiUrl } from '.';

export const getMarketHoursBaseUrl = () => `${baseApiUrl}/marketdata`;

export const getHoursForMultipleMarketsUrl = () =>
  `${getMarketHoursBaseUrl()}/hours`;

export const getHoursForSingleMarket = (market: string) =>
  `${getMarketHoursBaseUrl()}/${market}/hours`;
