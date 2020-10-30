import { getBaseApiUrl, numberOrString } from '.';

export const getTransactionsUrl = (accountId: numberOrString) =>
  `${getBaseApiUrl()}/accounts/${accountId}/transactions`;

export const getTransactionUrl = (
  accountId: numberOrString,
  transactionId: numberOrString
) => `${getTransactionsUrl(accountId)}/${transactionId}`;
