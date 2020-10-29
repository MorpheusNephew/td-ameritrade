import { IStringifyOptions } from 'qs';

export const queryStringOptions: IStringifyOptions = {
  addQueryPrefix: true,
  arrayFormat: 'comma',
  skipNulls: true,
};
