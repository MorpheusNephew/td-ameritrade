import { baseApiUrl, numberOrString } from '.';

export const getAllAccountsUrl = (): string => `${baseApiUrl}/accounts`;

export const getAccountUrl = (accountId: numberOrString): string => {
  return `${getAllAccountsUrl()}/${accountId}`;
};
