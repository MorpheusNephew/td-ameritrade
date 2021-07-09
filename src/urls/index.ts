export * from './auth-urls';
export * from './account-urls';
export * from './instrument-urls';
export * from './market-hours-urls';
export * from './movers-urls';
export * from './orders-urls';
export * from './price-history-urls';
export * from './saved-orders-url';

export const getHostname = () => 'tdameritrade.com';
export const getBaseApiUrl = () => `https://api.${getHostname()}/v1`;
export const getMarketDataBaseUrl = () => `${getBaseApiUrl()}/marketdata`;
export type numberOrString = number | string;
