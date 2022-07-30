import { BigNumber } from 'bignumber.js';

const defaultDecimals = 18;
BigNumber.config({ DECIMAL_PLACES: defaultDecimals });

export const calculateAmount = (
  balanceWeiString: string,
  decimals = defaultDecimals
) => {
  return new BigNumber(balanceWeiString)
    .dividedBy(new BigNumber(10).pow(decimals))
    .toNumber();
};
