export function calculateStatTotal(stats, func = ({ value }) => value) {
  let total = 0;
  for (const [key, val] of Object.entries(stats)) {
    const res = func({ key, value: val });
    if (!isNaN(res)) total += res;
  }
  return total;
}

export function getImageLocationByName(name) {
  const formattedName = name.toLowerCase().replace(' ', '-').replace('.', '');
  return [
    'Mario',
    'Luigi',
    'Waluigi',
    'Wario',
    'Donkey Kong',
    'Diddy Kong',
    'Peach',
    'Daisy',
    'Yoshi',
    'Birdo',
    'Bowser',
    'Bowser Jr.',
    'Wiggler',
    'Red Koopa Paratroopa',
    'Light Blue Yoshi',
    'Green Koopa Paratroopa',
    'Green Dry Bones',
    'Blue Dry Bones',
    'Blue Shy Guy',
    'Yellow Shy Guy',
    'Green Shy Guy',
    'Gray Shy Guy',
    'King K. Rool',
    'Red Koopa Paratroopa'
  ].includes(name)
    ? `/images/${formattedName}.jpg`
    : `/images/${formattedName}.png`;
}
