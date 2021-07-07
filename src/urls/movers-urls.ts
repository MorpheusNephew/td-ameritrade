import { getMarketDataBaseUrl } from '.';

export type Index = '$COMPX' | '$DJI' | '$SPX.X';

export const getMoversUrl = (index: Index) =>
  `${getMarketDataBaseUrl()}/${index}/movers`;
