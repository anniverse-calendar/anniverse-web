export function assertAndParseInt(val: string | string[] | undefined): number {
  if (typeof val !== 'string') {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
  return parseInt(val, 10);
}
