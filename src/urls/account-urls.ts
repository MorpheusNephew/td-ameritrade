import { getBaseApiUrl, numberOrString } from '.';

export const getAllAccountsUrl = (): string => `${getBaseApiUrl()}/accounts`;

export const getAccountUrl = (accountId: numberOrString): string => {
  return `${getAllAccountsUrl()}/${accountId}`;
};
