import { stringify } from 'qs';
import { baseApiUrl, numberOrString } from '.';

export const getAllAccountsUrl = (fields?: string[]): string => {
  const params = stringify({
    fields,
  });

  const url = `${baseApiUrl}/accounts`;

  return params ? `${url}?${params}` : url;
};

export const getAccountUrl = (
  accountId: numberOrString,
  fields?: string[]
): string => {
  const params = stringify({
    fields,
  });

  const url = `${getAllAccountsUrl()}/${accountId}`;

  return params ? `${url}?${params}` : url;
};
