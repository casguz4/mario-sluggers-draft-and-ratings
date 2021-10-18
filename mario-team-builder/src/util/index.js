export function calculateStatTotal(stats, func = ({ value }) => value) {
  let total = 0;
  for (const [key, val] of Object.entries(stats)) {
    const res = func({ key, value: val });
    if (!isNaN(res)) total += res;
  }
  return total;
}
