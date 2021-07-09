import { numberOrString, getAccountUrl } from '.';

export const getAccountSavedOrdersUrl = (accountId: numberOrString) =>
  `${getAccountUrl(accountId)}/savedorders`;

export const getSavedOrderUrl = (
  accountId: numberOrString,
  savedOrderId: numberOrString
) => `${getAccountSavedOrdersUrl(accountId)}/${savedOrderId}`;
