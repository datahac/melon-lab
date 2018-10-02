import * as R from 'ramda';
import queryString from 'query-string';
import memoizeOne from 'memoize-one';

export const parseUrl = memoizeOne((url) => queryString.parseUrl(url));
export const extractQueryParam = R.curryN(2, (name, url) => {
  const parsed = parseUrl(url);
  return parsed.query && parsed.query[name];
});

export const extractAddress = extractQueryParam('address');
export const extractBaseSymbol = extractQueryParam('base');
export const extractQuoteSymbol = extractQueryParam('quote');
