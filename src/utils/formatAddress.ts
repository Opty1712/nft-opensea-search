export const formatAddress = (address: string) => {
  return address.slice(0, 3) + '...' + address.slice(-3);
};
