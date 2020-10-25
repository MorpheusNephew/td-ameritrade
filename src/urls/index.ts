export * from './auth-urls';
export * from './account-urls';
export * from './instrument-urls';
export * from './market-hours-urls';
export * from './movers';
export * from './order-urls';

export const getHostname = () => 'tdameritrade.com';
export const getBaseApiUrl = () => `https://api.${getHostname()}/v1`;
export type numberOrString = number | string;
