export function getSpectrumColors() {
  const hues = [0, 22, 48, 108, 196, 277];
  const sats = [35, 50, 80];
  const light = [50, 50, 50];

  return [
    'hsl(0, 50%, 50%)',
  ];
}

export function getColors() {
  const spectrums = getSpectrumColors();

  return [
    '#f00000',
    '#f08000',
    '#f0f000',
    '#80f000',
    ...spectrums,
  ];
}
