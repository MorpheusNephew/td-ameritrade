import { getBaseApiUrl } from '.';

export const getInstrumentsUrl = () => `${getBaseApiUrl()}/instruments`;

export const getInstrumentUrl = (cusip: string) =>
  `${getInstrumentsUrl()}/${cusip}`;
