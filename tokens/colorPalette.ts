import { setLightness } from 'polished';

const corePalette = {
  blue: '#1599FF',
  gray: '#323232',
  green: '#00C980',
  orange: '#FF5C00',
  pink: '#D566DB',
  purple: '#9B00E3',
  red: '#FF002E',
  teal: '#76B7E7',
  yellow: '#FFC700',
};

type ColorLightnessValue = 100 | 200 | 300 | 400 | 500 | 600 | 700;

type ValidColorSwatchName =
  `${keyof typeof corePalette}--${ColorLightnessValue}`;

const coreSwatches = Object.keys(corePalette).reduce(
  (acc, colorName) => {
    const coreColorName = colorName as keyof typeof corePalette;

    return {
      ...acc,
      [`${colorName}--100`]: setLightness(0.95, corePalette[coreColorName]),
      [`${coreColorName}--200`]: setLightness(0.8, corePalette[coreColorName]),
      [`${coreColorName}--300`]: setLightness(0.6, corePalette[coreColorName]),
      [`${coreColorName}--400`]: corePalette[coreColorName],
      [`${coreColorName}--500`]: setLightness(0.4, corePalette[coreColorName]),
      [`${coreColorName}--600`]: setLightness(0.2, corePalette[coreColorName]),
      [`${coreColorName}--700`]: setLightness(0.1, corePalette[coreColorName]),
    };
  },
  {} as {
    [K in ValidColorSwatchName]: string;
  }
);

const colorSwatches = {
  'black': 'rgba(0, 0, 0, 1)',
  'border': coreSwatches['gray--100'],
  'brand': coreSwatches['purple--400'],
  'danger': coreSwatches['red--500'],
  'highlighted': coreSwatches['blue--400'],
  'link--hovered': coreSwatches['purple--200'],
  'link': coreSwatches['blue--400'],
  'shaded': coreSwatches['gray--100'],
  'shadow': 'rgba(0, 0, 0, 0.3)',
  'text': coreSwatches['purple--700'],
  'textFaded': coreSwatches['gray--200'],
  'transparent': 'transparent',
  'white': 'rgba(255, 255, 255, 1)',
  'white--translucent': 'rgba(255, 255, 255, 0.3)',
};

const colorPalette = {
  ...corePalette,
  ...coreSwatches,
  ...colorSwatches,
};

export type { ColorLightnessValue, ValidColorSwatchName };
export { colorPalette };
