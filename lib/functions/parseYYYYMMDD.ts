export function parseYYYYMMDD(val: string | string[] | undefined): {
  year: number;
  month: number;
  day: number;
} {
  if (typeof val !== 'string') {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
  const ym = val.match(/^([0-9]{4})([0-9]{2})([0-9]{2})$/);
  if (!ym) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
  const year = parseInt(ym[1], 10);
  const month = parseInt(ym[2], 10);
  const day = parseInt(ym[3], 10);
  if (month < 1 || month > 12) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
  return {
    year,
    month,
    day,
  };
}
