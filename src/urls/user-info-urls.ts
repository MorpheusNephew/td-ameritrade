import { getBaseApiUrl, numberOrString } from '.';

export const getPreferencesUrl = (accountId: numberOrString) =>
  `${getBaseApiUrl()}/accounts/${accountId}/preferences`;

export const getSubscriptionKeysUrl = () =>
  `${getUserPrincipalsUrl()}/streamersubscriptionkeys`;

export const getUserPrincipalsUrl = () => `${getBaseApiUrl()}/userprincipals`;
