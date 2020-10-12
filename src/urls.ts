const hostname = 'tdameritrade.com';
const baseApiUrl = `https://api.${hostname}/v1`;
const baseAuthUrl = `https://auth.${hostname}`;
export const accessTokenUrl = `${baseApiUrl}/oauth2/token`;

export const getAuthUrl = (clientId: string, redirectUri:string) => `${baseAuthUrl}/auth?response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}%40AMER.OAUTHAP`;
