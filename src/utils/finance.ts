import { BigNumber } from 'bignumber.js';

const defaultDecimals = 18;
BigNumber.config({ DECIMAL_PLACES: defaultDecimals });

export const bnToDec = (balanceInWei: string, decimals = defaultDecimals) => {
  const bn = new BigNumber(balanceInWei);
  if (bn.isZero() || bn.isNaN()) return 0;

  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber();
};

export const decToBn = (dec: number | string, decimals = 18) => {
  return new BigNumber(dec, 10).multipliedBy(new BigNumber(10).pow(decimals));
};
