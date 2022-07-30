/**
 * converts a regular number to a hexadecimal string like 0x4fa23...
 * */
export function decToHexString(number: number): string {
  return `0x${Number(number).toString(16)}`;
}
