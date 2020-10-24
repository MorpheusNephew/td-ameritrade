import { baseApiUrl } from '.';

export const getInstrumentsUrl = () => `${baseApiUrl}/instruments`;

export const getInstrumentUrl = (cusip: string) =>
  `${getInstrumentsUrl()}/${cusip}`;
