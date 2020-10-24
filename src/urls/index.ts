export * from './auth-urls';
export * from './account-urls';
export * from './instrument-urls';
export * from './market-hours-urls';
export * from './movers';
export * from './order-urls';

export const hostname = 'tdameritrade.com';
export const baseApiUrl = `https://api.${hostname}/v1`;
export type numberOrString = number | string;
