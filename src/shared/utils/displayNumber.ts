import { toBigNumber } from '~/utils/functionalBigNumber';

const displayNumber = (number, decimals = 4) =>
  toBigNumber(number).toFixed(decimals);

export default displayNumber;
