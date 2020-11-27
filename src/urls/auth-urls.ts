import { getBaseApiUrl, getHostname } from '.';

export const getAccessTokenUrl = () => `${getBaseApiUrl()}/oauth2/token`;

export interface authOptions {
  client_id: string;
  redirect_uri: string;
  state?: string;
}

const getBaseAuthUrl = () => `https://auth.${getHostname()}`;

export const getAuthUrl = (options: authOptions): string => {
  const { redirect_uri: redirectUri, client_id: clientId, state } = options;

  const url = `${getBaseAuthUrl()}/auth?response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}%40AMER.OAUTHAP`;

  return state ? `${url}&state=${state}` : url;
};
