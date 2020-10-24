import { baseApiUrl, hostname } from '.';

export const getAccessTokenUrl = () => `${baseApiUrl}/oauth2/token`;

export interface authOptions {
  client_id: string;
  redirect_uri: string;
}

const baseAuthUrl = `https://auth.${hostname}`;

export const getAuthUrl = (options: authOptions): string => {
  const { redirect_uri: redirectUri, client_id: clientId } = options;

  return `${baseAuthUrl}/auth?response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}%40AMER.OAUTHAP`;
};
