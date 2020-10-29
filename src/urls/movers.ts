import { getMarketHoursBaseUrl } from '.';

export type Index = '$COMPX' | '$DJI' | '$SPX.X';

export const getMoversUrl = (index: Index) =>
  `${getMarketHoursBaseUrl()}/${index}/movers`;
