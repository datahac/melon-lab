import * as R from 'ramda';

const resolveNetwork = R.cond([
  [R.equals(42), R.always('KOVAN')],
  [R.equals(1), R.always('LIVE')],
  [R.T, R.always('DEV')],
]);

export default resolveNetwork;
