export function getSpectrumColors() {
  const hues = [0, 28, 48, 75, 108, 150, 196, 230, 277, 310];
  const sats = [35, 50, 80];
  const lights = [50, 55, 60];

  const colors = [];
  for (const hue of hues) {
    colors.push(...sats.map((sat, index) => `hsl(${hue}, ${sat}%, ${lights[index]}%)`));
  }

  return colors;
}

export function getColors() {
  const spectrums = getSpectrumColors();

  return [
    'hsl(0, 0%, 60%)',
    'hsl(0, 0%, 80%)',
    'hsl(0, 0%, 100%)',
    'hsl(20, 30%, 45%)',
    'hsl(20, 30%, 60%)',
    'hsl(20, 30%, 75%)',
    ...spectrums,
  ];
}
