import qs from 'qs';
import { getBaseApiUrl, getHostname } from '.';
import { queryStringOptions } from '../config';

export const getAccessTokenUrl = () => `${getBaseApiUrl()}/oauth2/token`;

export interface authOptions {
  client_id: string;
  redirect_uri: string;
  state?: string;
}

const getBaseAuthUrl = () => `https://auth.${getHostname()}`;

export const getAuthUrl = (options: authOptions): string => {
  const { redirect_uri, client_id, state } = options;

  const params = qs.stringify(
    {
      response_type: 'code',
      client_id: `${client_id}%40AMER.OAUTHAP`,
      state,
    },
    queryStringOptions
  );

  return `${getBaseAuthUrl()}/auth${params}&redirect_uri=${redirect_uri}`;
};
