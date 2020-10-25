import { getBaseApiUrl, numberOrString } from '.';
import { getAccountUrl } from './account-urls';

export const getAccountOrdersUrl = (accountId: numberOrString) =>
  `${getAccountUrl(accountId)}/orders`;

export const getOrderUrl = (
  accountId: numberOrString,
  orderId: numberOrString
) => `${getAccountOrdersUrl(accountId)}/${orderId}`;

export const getLinkedAccountsOrders = () => `${getBaseApiUrl()}/orders`;

export const getAccountSavedOrdersUrl = (accountId: numberOrString) =>
  `${getAccountUrl(accountId)}/savedorders`;

export const getSavedOrderUrl = (
  accountId: numberOrString,
  savedOrderId: numberOrString
) => `${getAccountSavedOrdersUrl(accountId)}/${savedOrderId}`;
