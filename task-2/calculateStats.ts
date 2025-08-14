/**
 * Вычисляет статистические значения (мин., макс., среднее) из массива элементов.
 *
 * @template T - Тип элементов в массиве.
 * @param {T[]} items - Массив элементов, для которых необходимо рассчитать статистику.
 * @param {(item: T) => number} extractor - Функция, которая извлекает числовое значение из элемента.
 * @returns {{ min: number; max: number; average: number } | null} Объект, содержащий минимальное, максимальное и среднее значения, или null, если массив пустой.
 */
function calculateStats<T>(items: T[], extractor: (item: T) => number): { min: number; max: number; average: number } | null {
  if (!items.length) {
    return null;
  }

  const values = items.map(extractor);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const average = values.reduce((total, current) => total + current, 0) / values.length;

  return { min, max, average };
}
