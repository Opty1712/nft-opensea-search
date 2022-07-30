export function getKeys<O>(o: O) {
  return Object.keys(o) as (keyof O)[];
}
