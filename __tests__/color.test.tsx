import { getAdjustedSwatchName } from '@/react-handy-box/colors';
import {
  ColorLightnessAdjustmentValue,
  ColorOpacityAdjustmentValue,
  ColorSwatchName,
  ColorThemeName,
  ColorValue,
} from '@/react-handy-box/types';

type TestDefinition = {
  givenColor: ColorValue;
  themeName?: ColorThemeName;
  lightnessAdjustment: ColorLightnessAdjustmentValue | undefined;
  opacityAdjustment: ColorOpacityAdjustmentValue | undefined;
  expect: ColorSwatchName;
};

const tests: Record<string, TestDefinition> = {
  'adjusts utility colors (by not doing anything)': {
    givenColor: 'white',
    lightnessAdjustment: 500,
    opacityAdjustment: 50,
    expect: 'white',
  },

  'sets absolute lightness and opacity on simple swatch name': {
    givenColor: 'purple',
    lightnessAdjustment: 500,
    opacityAdjustment: 50,
    expect: 'purple--500--50',
  },

  'adjusts opacity only if lightness is undefined': {
    givenColor: 'purple--200--50',
    lightnessAdjustment: undefined,
    opacityAdjustment: '+40',
    expect: 'purple--200--90',
  },

  'increases to lightness do not exceed max lightness': {
    givenColor: 'purple--500',
    lightnessAdjustment: '+500',
    opacityAdjustment: undefined,
    expect: 'purple--700--100',
  },

  'decreases to lightness do not subceed min lightness': {
    givenColor: 'purple--500',
    lightnessAdjustment: '-500',
    opacityAdjustment: undefined,
    expect: 'purple--100--100',
  },

  'increases to opacity do not exceed max opacity': {
    givenColor: 'purple--500--70',
    lightnessAdjustment: undefined,
    opacityAdjustment: '+70',
    expect: 'purple--500--100',
  },

  'decreases to opacity do not subceed min opacity': {
    givenColor: 'purple--500--70',
    lightnessAdjustment: undefined,
    opacityAdjustment: '-70',
    expect: 'purple--500--10',
  },

  '[dark theme] resolves aliases then makes adjustment': {
    givenColor: 'border', // ['gray--200', 'purple--300--20'],
    themeName: 'dark',
    lightnessAdjustment: '+100',
    opacityAdjustment: '-10',
    expect: 'purple--400--10',
  },

  '[light theme] resolves aliases then makes adjustment': {
    givenColor: 'border', // ['gray--200', 'purple--300--20'],
    themeName: 'light',
    lightnessAdjustment: '+100',
    opacityAdjustment: '-10',
    expect: 'gray--300--90',
  },
};

describe('Color Tests', () => {
  Object.keys(tests).forEach((testName) => {
    const test = tests[testName];

    it(testName, () => {
      const adjustedSwatchName = getAdjustedSwatchName(
        test.givenColor,
        test.lightnessAdjustment,
        test.opacityAdjustment,
        test.themeName ?? 'light'
      );

      expect(adjustedSwatchName).toStrictEqual(test.expect);
    });
  });
});
