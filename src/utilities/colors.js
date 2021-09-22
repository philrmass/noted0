export function getSpectrumColors() {
  const hues = [0, 30, 60, 120, 196, 230, 277, 310];
  const sats = [100, 100];
  const lights = [91, 85];

  const colors = [];
  for (const hue of hues) {
    colors.push(...sats.map((sat, index) => `hsl(${hue}, ${sat}%, ${lights[index]}%)`));
  }

  return colors;
}

export function getColors() {
  const spectrums = getSpectrumColors();
  const all = [
    'hsl(0, 0%, 100%)',
    'hsl(0, 0%, 81%)',
    'hsl(20, 30%, 90%)',
    'hsl(20, 30%, 78%)',
    ...spectrums,
  ];

  return sortColors(all);
}

export function sortColors(all) {
  const size = 2;
  const sorted = [];

  for (let i = 0; i < all.length; i++) {
    const group = Math.floor(i / size);
    const isOdd = Boolean(group % 2);
    const min = group * size;
    const max = min + size - 1;
    const offset = i - min;
    const j = isOdd ? i : max - offset;

    sorted.push(all[j]);
  }

  return sorted;
}
