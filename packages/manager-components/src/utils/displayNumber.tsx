import { toBigNumber } from './functionalBigNumber';

const displayNumber = (number, decimals = 4) =>
  toBigNumber(number).toFixed(decimals);

export default displayNumber;
