import { getMarketDataBaseUrl } from '.';

export const getQuoteUrl = (symbol: string) =>
  `${getMarketDataBaseUrl()}/${symbol}/quotes`;

export const getQuotesUrl = () => `${getMarketDataBaseUrl()}/quotes`;
