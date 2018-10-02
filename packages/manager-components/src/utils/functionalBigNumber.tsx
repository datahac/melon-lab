import BigNumber from 'bignumber.js';

export const toBigNumber = value =>
  new BigNumber(value === '...' ? 0 : value || 0);

export const multiply = (base, ...args) =>
  args
    .reduce(
      (acc, current) => acc.times(toBigNumber(current)),
      toBigNumber(base),
    )
    .toString(10);

export const add = (base, ...args) =>
  args
    .reduce((acc, current) => acc.add(toBigNumber(current)), toBigNumber(base))
    .toString(10);

export const divide = (base, ...args) =>
  args
    .reduce((acc, current) => acc.div(toBigNumber(current)), toBigNumber(base))
    .toString(10);

export const isZero = numberToCheck => toBigNumber(numberToCheck).eq(0);

export const greaterThan = (a, b) => toBigNumber(a).gt(b || 0);

export const equals = (a, b) => toBigNumber(a).eq(b || 0);

export const max = (a, b) => (greaterThan(a, b) ? a : b);

export const min = (a, b) => (greaterThan(a, b) ? b : a);
