import { getBaseApiUrl, numberOrString } from '.';

export const getWatchlistsUrl = (accountId: numberOrString) =>
  `${getBaseApiUrl()}/accounts/${accountId}/watchlists`;

export const getWatchlistUrl = (
  accountId: numberOrString,
  watchlistId: numberOrString
) => `${getWatchlistsUrl(accountId)}/${watchlistId}`;

export const getMultipleAccountsWatchlistsUrl = () =>
  `${getBaseApiUrl()}/accounts/watchlists`;
