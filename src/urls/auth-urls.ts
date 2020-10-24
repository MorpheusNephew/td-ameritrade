import { stringify } from 'qs';
import { baseApiUrl, hostname } from '.';

export const getAccessTokenUrl = () => `${baseApiUrl}/oauth2/token`;

export interface authOptions {
  client_id: string;
  redirect_uri: string;
}

const baseAuthUrl = `https://auth.${hostname}`;

export const getAuthUrl = (options: authOptions): string => {
  const { redirect_uri, client_id } = options;

  const params = stringify({
    response_type: 'code',
    client_id: `${client_id}%40AMER.OAUTHAP`,
    redirect_uri,
  });

  return `${baseAuthUrl}/auth?${params}`;
};
