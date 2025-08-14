function calculateStats<T>(items: T[], getValue: (item: T) => number): { min: number; max: number; average: number } | null {
  if (!items.length) {
    return null;
  }

  const values = items.map(getValue);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const average = values.reduce((total, current) => total + current, 0) / values.length;

  return { min, max, average };
}
