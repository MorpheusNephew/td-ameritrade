import { getMarketHoursBaseUrl } from '.';

export const getMoversUrl = (index: string) =>
  `${getMarketHoursBaseUrl()}/${index}/movers`;
