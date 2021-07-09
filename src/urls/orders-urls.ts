import { getBaseApiUrl, numberOrString } from '.';
import { getAccountUrl } from './account-urls';

export const getOrdersUrl = (accountId: numberOrString) =>
  `${getAccountUrl(accountId)}/orders`;

export const getOrderUrl = (
  accountId: numberOrString,
  orderId: numberOrString
) => `${getOrdersUrl(accountId)}/${orderId}`;

export const getLinkedAccountsOrders = () => `${getBaseApiUrl()}/orders`;
